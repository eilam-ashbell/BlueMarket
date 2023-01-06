import { createStore } from "redux";
import { UserModel } from "../models/user-model";
import jwtDecode from "jwt-decode";

export class AuthState {
    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        // Get token from local storage
        this.token = localStorage.getItem("token");
        // If there is token in local storage
        if (this.token) {
            // Decode the token and assign in "container"
            const container: { user: UserModel } = jwtDecode(this.token);
            // Assign user data to state
            this.user = container.user;
        }
    }
}

export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
}
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

export function authReducer(
    currentState = new AuthState(),
    action: AuthAction
): AuthState {
    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.Register: // payload is token
        case AuthActionType.Login: // payload is token
            // Assign token to state
            newState.token = action.payload;
            const container: { user: UserModel } = jwtDecode(newState.token);
            // Assign user data to state
            newState.user = container.user;
            // Save token in local storage
            localStorage.setItem("token", newState.token);
            break;
        case AuthActionType.Logout: // No payload
            // Empty AuthState
            newState.token = null;
            newState.user = null;
            // Delete token from local storage
            localStorage.removeItem("token");
            localStorage.removeItem("continueShopping");
            break;
    }

    return newState;
}

export const authStore = createStore(authReducer);
