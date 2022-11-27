import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { CredentialModel } from "../models/credentials.model";
import { UserModel } from "../models/user-model";
import { AuthAction, AuthActionType, authStore } from "../redux/auth-state";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private http: HttpClient) {}

    // Register
    public async register(user: UserModel): Promise<void> {
        // Send user object to server, get back token
        const response = await firstValueFrom(
            this.http.post<string>(environment.authRoute + "register", user)
        );
        // Extract token
        const token = response;
        // Save token in AuthState
        const action: AuthAction = {
            type: AuthActionType.Register,
            payload: token,
        };
        authStore.dispatch(action);
    }

    // Login
    public async login(credentials: CredentialModel): Promise<void> {
        // Send credentials to server
        const response = await firstValueFrom(
            this.http.post<string>(environment.authRoute + "login", credentials)
        );
        // Extract token
        const token = response;
        // Save token in AuthState
        const action: AuthAction = {
            type: AuthActionType.Login,
            payload: token,
        };
        authStore.dispatch(action);
    }

    // Logout
    public logout(): void {
        // Delete token from AuthState
        const action: AuthAction = {
            type: AuthActionType.Logout,
        };
        authStore.dispatch(action);
    }
}
