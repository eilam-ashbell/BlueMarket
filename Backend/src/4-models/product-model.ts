import { UploadedFile } from "express-fileupload";
import mongoose from "mongoose";
import { CategoryModel } from "./category-model";

// 1. Model interface - describing the data:
export interface IProductModel extends mongoose.Document {
    _id: string;
    name: string;
    price: number;
    image: UploadedFile;
    imageName: string;
    categoryId: mongoose.Schema.Types.ObjectId;
}

// 2. Model schema - describing validation, data, constraints...
export const ProductSchema = new mongoose.Schema<IProductModel>(
    {
        name: {
            // Type:
            type: String, // JavaScript String
            // Validations:
            required: [true, "Missing name"],
            minlength: [2, "name too short"],
            maxlength: [100, "name to long"],
            // Options:
            trim: true,
            unique: true
        },
    price: {
        // Type:
        type: Number, // JavaScript String
        // Validations:
        required: [true, "Missing price"],
        min: [0, "price too low"],
        max: [1000, "price to high"],
        // Options:
        trim: true,
    },
    image: {
        // Type:
        type: Object,
    },
    imageName: {
        // Type:
        type: String, // JavaScript String
        // Options:
        trim: true,
        unique: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId
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
ProductSchema.virtual("category", {
    ref: CategoryModel,
    localField: "categoryId",
    foreignField: "_id",
    justOne: true,
});

// 3. Model Class - the final model class:
export const ProductModel = mongoose.model<IProductModel>(
    "ProductModel",
    ProductSchema,
    "Products"
); // Model name, schema name, collection name
