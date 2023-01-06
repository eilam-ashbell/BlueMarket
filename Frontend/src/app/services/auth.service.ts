import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { CredentialModel } from "../models/credentials.model";
import { UserModel } from "../models/user-model";
import { AuthAction, AuthActionType, authStore } from "../redux/auth-state";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

    public passwordRegex: RegExp =
        /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{6,32}$/;

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
    // Check if there is any token and it expire
    public isAuthenticated(): boolean {
        const token = authStore.getState().token;
        // Return false if token is expired or not exist
        return !this.jwtHelper.isTokenExpired(token);
    }

    // Decode user token
    public decodeUserToken(): any {
        const token = authStore.getState().token;
        return this.jwtHelper.decodeToken(token);
    }

    public async checkIdNumber(idNumber: string): Promise<any> {
        const payload = {
            idNumber: idNumber,
        };
        return firstValueFrom(
            this.http.post<any>(environment.authRoute + "check_id", payload)
        );
    }

    public checkPasswordValidation(value: string): string[] {
        const messages: string[] = [];
        const isWhitespace = /^(?=.*\s)/;
        if (isWhitespace.test(value)) {
            messages.push("Password must not contain white-spaces.");
        }
        const isContainsUppercase = /^(?=.*[A-Z])/;
        if (!isContainsUppercase.test(value)) {
            messages.push(
                "Password must have at least one uppercase character"
            );
        }
        const isContainsLowercase = /^(?=.*[a-z])/;
        if (!isContainsLowercase.test(value)) {
            messages.push(
                "Password must have at least one lowercase character"
            );
        }
        const isContainsNumber = /^(?=.*[0-9])/;
        if (!isContainsNumber.test(value)) {
            messages.push("Password must contain at least one digit");
        }
        const isContainsSymbol =
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
        if (!isContainsSymbol.test(value)) {
            messages.push("Password must contain at least one special symbol");
        }
        const isValidLength = /^.{6,32}$/;
        if (!isValidLength.test(value)) {
            messages.push("Password must be 6-32 characters Long");
        }
        return messages;
    }
}
