import { NextFunction, Request, Response } from "express";
import { marketProducts } from "./database";

const ensureNameAlreadyExistsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { name } = request.body[0];

  const findProductIndex = marketProducts.findIndex(
    (prod) => prod.name == name
  );

  if (findProductIndex !== -1) {
    return response.status(409).json({
      error: "Product already registered",
    });
  }

  response.locals.productIndex = findProductIndex;

  return next();
};

const ensureNameAlreadyExistsPatchMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { name } = request.body;

  const findProductIndex = marketProducts.findIndex(
    (prod) => prod.name === name
  );

  if (findProductIndex !== -1) {
    return response.status(409).json({
      error: "Product already registered",
    });
  }

  response.locals.productIndex = findProductIndex;

  return next();
};

const ensureIdAlreadyExistsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { id } = request.params;

  const findProductIndex: number = marketProducts.findIndex(
    (prod) => prod.id === Number(id)
  );

  if (findProductIndex === -1) {
    return response.status(404).json({
      error: "Product not found",
    });
  }

  response.locals.productIndex = findProductIndex;

  return next();
};

export {
  ensureNameAlreadyExistsMiddleware,
  ensureIdAlreadyExistsMiddleware,
  ensureNameAlreadyExistsPatchMiddleware,
};
