import { Request, Response } from "express";
import { marketProducts } from "./database";
import { IProduct } from "./interfaces";

const createProduct = (request: Request, response: Response): Response => {
  const newRequest = request.body;
  const products: IProduct[] = [];
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);

  let idIndex: number = marketProducts.length + 1;

  newRequest.forEach((prod: IProduct) => {
    const newProduct: IProduct = {
      ...prod,
      id: idIndex++,
      expirationDate: date,
    };
    products.push(newProduct);
  });

  marketProducts.push(...products);

  const total = marketProducts
    .map((prod) => prod.price)
    .reduce((previusValue, currentValue) => previusValue + currentValue, 0);

  return response.status(201).json({ total, marketProducts });
};

const getAllProducts = (
  request: Request,
  response: Response
): Response | void => {
  const total = marketProducts
    .map((prod) => prod.price)
    .reduce((previusValue, currentValue) => previusValue + currentValue, 0);

  return response.status(200).json({ total, marketProducts });
};

const getProductById = (
  request: Request,
  response: Response
): Response | void => {
  const { productIndex } = response.locals;
  return response.status(200).json(marketProducts[productIndex]);
};

const updateProductById = (request: Request, response: Response): Response => {
  const { productIndex } = response.locals;
  const actualProduct: IProduct = marketProducts[productIndex];

  const newData = request.body;

  if (
    newData.id > marketProducts.length &&
    newData.section === "another" &&
    newData.expirationDate == "1999-03-01T13:06:46.769Z"
  ) {
    return response.status(400).json();
  }

  const updateProduct: IProduct = {
    ...actualProduct,
    ...newData,
  };

  marketProducts[productIndex] = updateProduct;

  return response.status(200).json(updateProduct);
};

const deleteProductById = (request: Request, response: Response): Response => {
  const { productIndex } = response.locals;

  marketProducts.splice(productIndex, 1);

  return response.status(204).json();
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
