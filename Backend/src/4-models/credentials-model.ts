import mongoose from "mongoose";
import { RoleModel } from "./role-model";

// 1. Model interface - describing the data:
export interface ICredentialModel extends mongoose.Document {
    email: string;
    password: string;
}

// 2. Model schema - describing validation, data, constraints...
export const CredentialSchema = new mongoose.Schema<ICredentialModel>(
    {
        
        email: {
            // Type:
            type: String, // JavaScript String
            // Validations:
            required: [true, "Missing email"],
            minlength: [2, "Email too short"],
            maxlength: [100, "Email to long"],
            // Options:
            trim: true,
            unique: true
        },
        password: {
            // Type:
            type: String, // JavaScript String
            // Validations:
            required: [true, "Missing password"],
            minlength: [2, "Password too short"],
            maxlength: [1000, "Password to long"],
            // Options:
            trim: true,
        },
    },
    {
        // Options
        versionKey: false, // Don't add __v for new documents.
    }
);

// 3. Model Class - the final model class:
export const CredentialsModel = mongoose.model<ICredentialModel>(
    "CredentialsModel",
    CredentialSchema,
    "Credentials"
); // Model name, schema name, collection name
