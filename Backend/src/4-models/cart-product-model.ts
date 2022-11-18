import mongoose from "mongoose";
import { ProductModel } from "./product-model";

export class CartProductModel {
    quantity: number;
    totalPrice: number;
    productId: string;

    constructor ( cartProductModel: CartProductModel ) {
        this.quantity = cartProductModel.quantity;
        this.totalPrice = cartProductModel.totalPrice;
        this.productId = cartProductModel.productId;
    }
}


// // 1. Model interface - describing the data:
// export interface ICartItemModel {
//     quantity: number;
//     totalPrice: number;
//     productId: string;
// }

// // 2. Model schema - describing validation, data, constraints...
// export const CartItemSchema = new mongoose.Schema<ICartItemModel>(
//     {
//         quantity: {
//             // Type:
//             type: Number, // JavaScript String
//             // Validations:
//             required: [true, "Missing quantity"],
//             min: [0, "quantity too low"],
//             max: [100, "quantity to high"],
//             // Options:
//             trim: true,
//         },
//         totalPrice: {
//             // Type:
//             type: Number, // JavaScript String
//             // Validations:
//             required: [true, "Missing total price"],
//             min: [0, "Total price too low"],
//             max: [100, "Total price to high"],
//             // Options:
//             trim: true,
//         },
//         productId: String
//     },
//     {
//         // Options
//         versionKey: false, // Don't add __v for new documents.
//         // For joined data
//         toJSON: { virtuals: true }, // Allow to create virtual field when returning JSON.
//         id: false,
//     }
// );

// // For joined data
// CartItemSchema.virtual("product", {
//     ref: ProductModel,
//     localField: "productId",
//     foreignField: "_id",
//     justOne: true,
// });

// // 3. Model Class - the final model class:
// export const CartItemModel = mongoose.model<ICartItemModel>(
//     "CartItemModel",
//     CartItemSchema,
//     "CartItems"
// ); // Model name, schema name, collection name
