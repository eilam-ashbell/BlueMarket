import { ICartModel, CartModel } from "../4-models/cart-model";
import { CartProductModel } from "../4-models/cart-product-model";
import { ValidationError } from "../4-models/client-errors";

// Add new cart:
async function addNewCart(cart: ICartModel): Promise<ICartModel> {
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
    cart.cartProducts.splice(productIndex, 1)

    // save cart
    const errors = cart.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return cart.save();
}

// Close cart after ordering:
async function closeCart(cartId): Promise<ICartModel> {
    // get cart
    const cart = await CartModel.findById(cartId).exec();
    cart.isOrdered = true;
    // save cart
    const errors = cart.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return cart.save();
}

export default {
    addNewCart,
    addNewProductToCart,
    deleteProductFromCart,
    closeCart,
};