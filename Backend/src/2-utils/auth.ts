import { IUserModel } from "../4-models/user-model";
import jwt from "jsonwebtoken";

const secretKey = "weGonnaShop";

function generateNewToken(user: IUserModel): string {
    // Create container object to insert inside the token
    const container = { user };

    // Generate new token
    const token = jwt.sign(container, secretKey, { expiresIn: "1h" });

    return token;
}

function verifyToken(authHeader: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            // if there is no auth header > verify fail
            if (!authHeader) {
                resolve(false);
                return;
            }

            // extract the token from the header
            const token = authHeader.substring(7);
            
            // If the header is empty > verify fail
            if (!token) {
                resolve(false);
                return;
            }

            // Verify token
            jwt.verify(token, secretKey, (err) => {
                if (err) {
                    resolve(false);
                    return;
                }
            });

            // if token is valid
            resolve(true);
        } catch (err: any) {
            reject(err);
        }
    });
}
function getUserRoleIdFromToken(authHeader: string): string {
    // extract token
    const token = authHeader.substring(7);

    // get user container from token
    const container = jwt.decode(token) as { user: IUserModel };

    // get user data from container
    const user = container.user;

    // get roleId of user
    const role = user.role.role.toString();

    return role;
}

export default {
    generateNewToken,
    verifyToken,
    getUserRoleIdFromToken,
};
