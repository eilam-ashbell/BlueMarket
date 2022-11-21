import mongoose from "mongoose";

// 1. Model interface - describing the data:
export interface IUserModel extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    identityNum: string;
    city: string;
    street: string;
    password: string;
    roleId: mongoose.Types.ObjectId;
}

// 2. Model schema - describing validation, data, constraints...
export const UserSchema = new mongoose.Schema<IUserModel>(
    {
        firstName: {
            // Type:
            type: String, // JavaScript String
            // Validations:
            required: [true, "Missing first name"],
            minlength: [2, "First name too short"],
            maxlength: [100, "First name to long"],
            // Options:
            trim: true,
        },
        lastName: {
            // Type:
            type: String, // JavaScript String
            // Validations:
            required: [true, "Missing last name"],
            minlength: [2, "Last name too short"],
            maxlength: [100, "Last name to long"],
            // Options:
            trim: true,
        },
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
        identityNum: {
            // Type:
            type: String, // JavaScript Number
            // Validations:
            required: [true, "Missing identity number"],
            minlength: [2, "Identity number too short"],
            maxlength: [100, "Identity number to long"],
            // Options:
            trim: true,
            unique: true,
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
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
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
// UserSchema.virtual("role", {
//     ref: RoleModel,
//     localField: "roleId",
//     foreignField: "_id",
//     justOne: true,
// });

// 3. Model Class - the final model class:
export const UserModel = mongoose.model<IUserModel>(
    "UserModel",
    UserSchema,
    "Users"
); // Model name, schema name, collection name
