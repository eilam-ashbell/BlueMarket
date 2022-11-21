import mongoose from "mongoose";
import { CartModel } from "./cart-model";
import { UserModel } from "./user-model";

export interface IOrderModel extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    cartId: mongoose.Schema.Types.ObjectId;
    totalPrice: number;
    city: string;
    street: string;
    dateOfOrder: Date;
    dateOfDelivery: Date;
    creditCard: string;
}

export const OrderSchema = new mongoose.Schema<IOrderModel>(
    {
        userId: mongoose.Schema.Types.ObjectId,
        cartId: mongoose.Schema.Types.ObjectId,
        totalPrice: {
            // Type:
            type: Number, // JavaScript Number
            // Validations:
            required: [true, "Missing total price"],
            min: [0, "total price too short"],
            max: [100000, "total price to long"],
            // Options:
            trim: true,
        },
        city: {
            // Type:
            type: String, // JavaScript String
            // Validations:
            required: [true, "Missing city"],
            minlength: [2, "City too short"],
            maxlength: [100, "City to long"],
            // Options:
            trim: true,
        },
        street: {
            // Type:
            type: String, // JavaScript String
            // Validations:
            required: [true, "Missing street"],
            minlength: [2, "Street too short"],
            maxlength: [100, "Street to long"],
            // Options:
            trim: true,
        },
        dateOfOrder: {
            // Type:
            type: Date, // JavaScript String
            // Validations:
            required: [true, "Missing date of order"],
            minlength: [2, "date of order too short"],
            maxlength: [100, "date of order to long"],
            // Options:
            trim: true,
            default: Date.now
        },
        dateOfDelivery: {
            // Type:
            type: Date, // JavaScript String
            // Validations:
            required: [true, "Missing date of delivery"],
            minlength: [2, "date of delivery too short"],
            maxlength: [100, "date of delivery to long"],
            // Options:
            trim: true,
        },
        creditCard: {
            // Type:
            type: String, // JavaScript Number
            // Validations:
            required: [true, "Missing credit card"],
            minlength: [4, "credit card too short"],
            maxlength: [4, "credit card to long"],
            // Options:
            trim: true,
        },
    },
    {
        // Options
        versionKey: false, // Don't add __v for new documents.
        // For joined data
        toJSON: { virtuals: true }, // Allow to create virtual field when returning JSON.
        id: false,
    }
);

// For joined data
OrderSchema.virtual("user", {
    ref: UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true,
});

OrderSchema.virtual("cart", {
    ref: CartModel,
    localField: "cardId",
    foreignField: "_id",
    justOne: true,
});

// 3. Model Class - the final model class:
export const OrderModel = mongoose.model<IOrderModel>(
    "OrderModel",
    OrderSchema,
    "orders"
); // Model name, schema name, collection name