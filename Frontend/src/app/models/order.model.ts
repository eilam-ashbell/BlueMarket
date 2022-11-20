
export class OrderModel {
    _id: string;
    userId: string;
    cartId: string;
    totalPrice: number;
    city: string;
    street: string;
    dateOfOrder: Date;
    dateOfDelivery: Date;
    creditCard: string;
}
