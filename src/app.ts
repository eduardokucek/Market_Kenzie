import express, { Application, json } from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getAllProducts,
  updateProductById,
} from "./logic";
import {
  ensureIdAlreadyExistsMiddleware,
  ensureNameAlreadyExistsMiddleware,
  ensureNameAlreadyExistsPatchMiddleware,
} from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/products", ensureNameAlreadyExistsMiddleware, createProduct);
app.get("/products", getAllProducts);
app.get("/products/:id", ensureIdAlreadyExistsMiddleware, getProductById);
app.patch(
  "/products/:id",
  ensureNameAlreadyExistsPatchMiddleware,
  ensureIdAlreadyExistsMiddleware,
  updateProductById
);
app.delete("/products/:id", ensureIdAlreadyExistsMiddleware, deleteProductById);

const PORT = 3000;
const runningMsg = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
