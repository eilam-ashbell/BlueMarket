// Add new cart

import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CartModel } from "../4-models/cart-model";
import { CartProductModel } from "../4-models/cart-product-model";
import { OrderModel } from "../4-models/order-model";
import cartLogic from "../5-logic/cart-logic";

const router = express.Router();

// POST http://localhost:3001/api/carts/new
router.post(
    "/new",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // const cart = new CartModel(request.body);
            const cartId = request.body.cartId;
            const addedCart = await cartLogic.addNewCart(cartId);
            response.status(201).json(addedCart);
        } catch (err: any) {
            next(err);
        }
    }
);

// Add new product to cart:
// PATCH http://localhost:3001/api/carts/add-product/:cartId
router.patch(
    "/add-product/:cartId",
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
// PATCH http://localhost:3001/api/carts/delete-product/:cartId/:productId
router.patch(
    "/delete-product/:cartId/:productId",
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

// Delete all products from cart:
// PATCH http://localhost:3001/api/carts/clear/:cartId
router.patch(
    "/clear/:cartId",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const cartId = request.params.cartId;
            const updatedCart = await cartLogic.clearCart(cartId);
            response.status(200).json(updatedCart);
        } catch (err: any) {
            next(err);
        }
    }
);

// Place order:
// POST http://localhost:3001/api/carts/placeorder/:cartId
router.post(
    "/place-order/:cartId",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // get cart id and insert to order object
            const cartId = request.params.cartId;
            request.body.cartId = cartId;
            // get last 4 digits of credit card
            request.body.creditCard = request.body.creditCard.slice(-4)
            const order = new OrderModel(request.body)
            // place order
            const placedOrder = await cartLogic.placeOrder(order);
            // close cart after placing order
            await cartLogic.closeCart(cartId)
            response.status(200).json(placedOrder);
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

// GET http://localhost:3001/api/carts/current
router.post(
    "/current",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userCartId = request.body.userCartId;
            const currentCart = await cartLogic.getCurrentCart(userCartId);
            response.status(201).json(currentCart[0]);
        } catch (err: any) {
            next(err);
        }
    }
);

export default router