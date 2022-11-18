// Add new cart

import express, { NextFunction, Request, Response } from "express";
import { CartModel } from "../4-models/cart-model";
import { CartProductModel } from "../4-models/cart-product-model";
import cartLogic from "../5-logic/cart-logic";

const router = express.Router();

// POST http://localhost:3001/api/carts/new
router.post(
    "/new",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const cart = new CartModel(request.body);
            const addedCart = await cartLogic.addNewCart(cart);
            response.status(201).json(addedCart);
        } catch (err: any) {
            next(err);
        }
    }
);

// Add new product to cart:
// PATCH http://localhost:3001/api/carts/addproduct/:cartId
router.patch(
    "/addproduct/:cartId",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const cartId = request.params.cartId;
            const product = new CartProductModel(request.body);
            const updatedCart = await cartLogic.addNewProductToCart(cartId, product);
            response.status(200).json(updatedCart);
        } catch (err: any) {
            next(err);
        }
    }
);

// Delete product from cart:
// PATCH http://localhost:3001/api/carts/deleteproduct/:cartId/:productId
router.patch(
    "/deleteproduct/:cartId/:productId",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const cartId = request.params.cartId;
            const productId = request.params.productId;
            const updatedCart = await cartLogic.deleteProductFromCart(cartId, productId);
            response.status(200).json(updatedCart);
        } catch (err: any) {
            next(err);
        }
    }
);

// Close cart:
// PATCH http://localhost:3001/api/carts/close/:cartId
router.patch(
    "/close/:cartId",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const cartId = request.params.cartId;
            const updatedCart = await cartLogic.closeCart(cartId);
            response.status(200).json(updatedCart);
        } catch (err: any) {
            next(err);
        }
    }
);

export default router