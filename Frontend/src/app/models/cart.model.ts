import { CartProductModel } from "./cart-product.model";

export class CartModel {
    _id: string;
    userId: string;
    creationDate: Date;
    cartProducts: CartProductModel[];
    isOrdered: boolean;
}