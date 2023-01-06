export class CartProductModel {
    quantity: number;
    totalPrice: number;
    productId: string;

    constructor(cartProductModel: CartProductModel) {
        this.quantity = cartProductModel.quantity;
        this.totalPrice = cartProductModel.totalPrice;
        this.productId = cartProductModel.productId;
    }
}
