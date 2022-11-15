import hash from "../2-utils/cyber";
import { v4 as uuid } from "uuid";
import { IUserModel, UserModel } from "../4-models/user-model";
import { UnauthorizedError, ValidationError } from "../4-models/client-errors";
import auth from "../2-utils/auth";
import { ICredentialModel } from "../4-models/credentials-model";
import mongoose from "mongoose";

async function register(user: IUserModel): Promise<string> {
    
    // Hash user password
    user.password = hash(user.password);

    // Assign roleId to user
    // user.roleId = "6373d7725cf769dda9da3cb6";
    user.roleId = new mongoose.Types.ObjectId("6373d7725cf769dda9da3cb6")

    // Validate user data
    const error = user.validateSync()
    if (error) throw new ValidationError(error.message);
    const addedUser = await user.save()

    // Delete user's password from user object
    delete addedUser.password
    delete addedUser._id
    delete addedUser.identityNum

    // Generate new token fo the user
    const token = auth.generateNewToken(user);

    return token;
}

async function login(credentials: ICredentialModel): Promise<string> {

    // Hash user password
    credentials.password = hash(credentials.password);
    
    // Validate user data
    const error = credentials.validateSync()
    if (error) throw new ValidationError(error.message);

    // Get user by username and password
    const user = await UserModel.findOne({ email: credentials.email, password: credentials.password}, {_id: 0, password: 0, identityNum: 0}).exec()

    if (user === null || undefined)
        throw new UnauthorizedError("Incorrect username or password");

    // Generate new token
    const token = auth.generateNewToken(user);
    return token;
}

export default {
    register,
    login,
};
