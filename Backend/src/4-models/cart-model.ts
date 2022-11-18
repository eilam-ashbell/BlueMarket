import mongoose from "mongoose";
import { CartProductModel } from "./cart-product-model";
// import { ICartItemModel } from "./cart-item-model";
import { UserModel } from "./user-model";

// 1. Model interface - describing the data:
export interface ICartModel extends mongoose.Document {
    _id: string;
    userId: mongoose.Schema.Types.ObjectId;
    creationDate: Date;
    cartProducts: CartProductModel[];
    isOrdered: boolean;
}

// 2. Model schema - describing validation, data, constraints...
export const CartSchema = new mongoose.Schema<ICartModel>(
    {
        userId: mongoose.Schema.Types.ObjectId,
        creationDate: {
            // Type:
            type: Date, // JavaScript String
            // Validations:
            required: [true, "Missing date"],
            minlength: [2, "date too short"],
            maxlength: [100, "date to long"],
            // Options:
            trim: true,
            default: Date.now
        },
        cartProducts: {
            type: [],
        },
        isOrdered: {
            type: Boolean,
            required: [true, "Missing isOrdered"],
            default: false
        }
    },
    {
        // Options
        versionKey: false, // Don't add __v for new documents.
        toJSON: { virtuals: true }, // Allow to create virtual field when returning JSON.
        id: false,
    }
);

// For joined data
CartSchema.virtual("user", {
    ref: UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true,
});

// 3. Model Class - the final model class:
export const CartModel = mongoose.model<ICartModel>(
    "CartModel",
    CartSchema,
    "Carts"
); // Model name, schema name, collection name
