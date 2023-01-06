import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { AuthAction, AuthActionType, authStore } from "../redux/auth-state";
import { NotifyService } from "./notify.service";

@Injectable({
    providedIn: "root",
})
export class RoleGuardService implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private notyf: NotifyService
    ) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const role = route.data?.["roleAccess"];
        const user = authStore.getState().user;

        // return false if there is no token
        if (!user) {
            this.router.navigate(["guest"]);
            return false;
        }

        // return false if token is expired
        if (!this.authService.isAuthenticated()) {
            const action: AuthAction = {
                type: AuthActionType.Logout,
            };
            authStore.dispatch(action);
            this.notyf.error(
                "This session has been expired. Please login again"
            );
            this.router.navigate(["guest"]);
            return false;
        }

        // Return false if user role is not authorized
        if (user.role.role !== role) {
            this.notyf.error(
                "you are not authorized. Try to login with another account"
            );
            role === "admin"
                ? this.router.navigate(["/home"])
                : this.router.navigate(["/admin"]);
            return false;
        }
        return true;
    }
}
