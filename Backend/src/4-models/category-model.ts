import mongoose from "mongoose";

// 1. Model interface - describing the data:
export interface ICategoryModel extends mongoose.Document {
    category: string;
}

// 2. Model schema - describing validation, data, constraints...
export const CategorySchema = new mongoose.Schema<ICategoryModel>(
    {
        category: {
            // Type:
            type: String, // JavaScript String
            // Validations:
            required: [true, "Missing category"],
            minlength: [2, "Category too short"],
            maxlength: [100, "Category to long"],
            // Options:
            trim: true,
            unique: true
        },
    },
    {
        // Options
        versionKey: false, // Don't add __v for new documents.
    }
);

// 3. Model Class - the final model class:
export const CategoryModel = mongoose.model<ICategoryModel>(
    "CategoryModel",
    CategorySchema,
    "Categorys"
); // Model name, schema name, collection name
