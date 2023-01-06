import { ICartModel, CartModel } from "../4-models/cart-model";
import { CartProductModel } from "../4-models/cart-product-model";
import { ValidationError } from "../4-models/client-errors";
import { IOrderModel } from "../4-models/order-model";
import { ObjectId } from "mongoose";

// Add new cart:
async function addNewCart(userCartId: string): Promise<ICartModel> {
    const cart = new CartModel();
    cart.userCartId = userCartId;
    const errors = cart.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return cart.save();
}

// Add new product to cart:
async function addNewProductToCart(
    cartId: string,
    product: CartProductModel
): Promise<ICartModel> {
    // get user's cart
    const cart = await CartModel.findById(cartId).exec();
    // Check if product already in cart
    const existIndex = cart.cartProducts.findIndex(
        (i) => i.productId === product.productId
    );
    // if not in cart => add it.
    if (existIndex < 0) {
        cart.cartProducts.push(product);
    } else {
        // if in cart => update quantity and total price
        product.quantity += cart.cartProducts[existIndex].quantity;
        product.totalPrice += cart.cartProducts[existIndex].totalPrice;
        cart.cartProducts[existIndex] = product;
    }
    // save cart
    const errors = cart.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return cart.save();
}

// Delete product from cart:
async function deleteProductFromCart(
    cartId: string,
    productId: string
): Promise<ICartModel> {
    // get user's cart
    const cart = await CartModel.findById(cartId).exec();
    // find product index in cart
    const productIndex = cart.cartProducts.findIndex(
        (i) => i.productId === productId
    );
    // remove product from card
    cart.cartProducts.splice(productIndex, 1);

    // save cart
    const errors = cart.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return cart.save();
}

// Delete all products from cart:
async function clearCart(cartId: string): Promise<ICartModel> {
    // get user's cart
    const cart = await CartModel.findById(cartId).exec();
    // remove product from card
    cart.cartProducts = [];
    // save cart
    const errors = cart.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return cart.save();
}

// place order:
async function placeOrder(order: IOrderModel): Promise<IOrderModel> {
    const errors = order.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return order.save();
}

// Close cart after ordering:
async function closeCart(cartId: string): Promise<ICartModel> {
    // get cart
    const cart = await CartModel.findById(cartId).exec();
    cart.isOrdered = true;
    // save cart
    const errors = cart.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return cart.save();
}

async function getCurrentCart(userCartId: string): Promise<ICartModel[]> {
    return CartModel.find({ userCartId: userCartId, isOrdered: false }).exec();
}

async function getCartById(cartId: ObjectId): Promise<ICartModel[]> {
    return CartModel.find({ cartId: cartId }).exec();
}

export default {
    addNewCart,
    addNewProductToCart,
    deleteProductFromCart,
    clearCart,
    placeOrder,
    closeCart,
    getCurrentCart,
    getCartById,
};
