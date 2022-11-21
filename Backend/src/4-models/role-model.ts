import mongoose from "mongoose";

// 1. Model interface - describing the data:
export interface IRoleModel extends mongoose.Document {
    role: string;
}

// 2. Model schema - describing validation, data, constraints...
export const RoleSchema = new mongoose.Schema<IRoleModel>(
    {
        role: {
            // Type:
            type: String, // JavaScript String
            // Validations:
            required: [true, "Missing role"],
            minlength: [2, "Role too short"],
            maxlength: [100, "Role to long"],
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
export const RoleModel = mongoose.model<IRoleModel>(
    "RoleModel",
    RoleSchema,
    "roles"
); // Model name, schema name, collection name
