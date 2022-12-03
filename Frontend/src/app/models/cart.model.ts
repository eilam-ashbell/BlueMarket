import { CartProductModel } from "./cart-product.model";

export class CartModel {
    _id: string;
    userCartId: string;
    creationDate: Date;
    cartProducts: CartProductModel[];
    isOrdered: boolean;

    constructor(cart: CartModel) {
        this._id = cart._id
        this.userCartId = cart.userCartId
        this.creationDate = cart.creationDate
        this.cartProducts = cart.cartProducts
        this.isOrdered = cart.isOrdered
    }
}