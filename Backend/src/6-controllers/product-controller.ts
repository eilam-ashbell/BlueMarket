import express, { NextFunction, request, Request, Response } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { ProductModel } from "../4-models/product-model";
import productLogic from "../5-logic/product-logic";

const router = express.Router();

// Get all products
// GET http://localhost:3001/api/products
router.get(
    "/",
    // verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const products = await productLogic.getAllProducts();
            response.json(products);
        } catch (err: any) {
            next(err);
        }
    }
);

// Add new product
// POST http://localhost:3001/api/products
router.post(
    "/",
    // verifyAdmin,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // get image file from the front
            request.body.image = request.files?.image;
            const product = new ProductModel(request.body);
            const addedProduct = await productLogic.addProduct(product);
            response.status(201).json(addedProduct);
        } catch (err: any) {
            next(err);
        }
    }
);

// Update product by _id
// PUT http://localhost:3001/api/products/:_id
router.put(
    "/:_id",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const _id = request.params._id;
            request.body._id = _id;
            // get image file from the front
            request.body.image = request.files?.image;
            const product = new ProductModel(request.body);
            const updatedProduct = await productLogic.updateProduct(product);
            response.json(updatedProduct);
        } catch (err: any) {
            next(err);
        }
    }
);

// Delete product by _id
// DELETE http://localhost:3001/api/products/:_id
router.delete(
    "/:_id",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const _id = request.params._id;
            await productLogic.deleteProduct(_id);
            response.sendStatus(204);
        } catch (err: any) {
            next(err);
        }
    }
);

export default router