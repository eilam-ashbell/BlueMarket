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

// Get all categories
// GET http://localhost:3001/api/products/categories
router.get(
    "/categories",
    // verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const categories = await productLogic.getAllCategories();
            response.json(categories);
        } catch (err: any) {
            next(err);
        }
    }
);

// Get  product by id
// GET http://localhost:3001/api/products/:productId
router.get(
    "/:productId",
    // verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const productId = request.params.productId;
            const product = await productLogic.getProduct(productId);
            response.json(product);
        } catch (err: any) {
            next(err);
        }
    }
);

// Get all products by category
// GET http://localhost:3001/api/products/categories/:categoryId
router.get(
    "/categories/:categoryId",
    // verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const categoryId = request.params.categoryId;
            const products = await productLogic.getAllProductsByCategory(categoryId);
            response.json(products);
        } catch (err: any) {
            next(err);
        }
    }
);

// Get all products by search
// GET http://localhost:3001/api/products/search/:searchValue
router.get(
    "/search/:searchValue",
    // verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const searchValue = request.params.searchValue;
            const products = await productLogic.getAllProductsBySearch(searchValue);
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