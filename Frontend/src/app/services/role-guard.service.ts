import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { authStore } from "../redux/auth-state";

@Injectable({
    providedIn: "root",
})
export class RoleGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        // TODO - figure out roleAccess error
        // @ts-ignore: Unreachable code error
        const role = route.data.roleAccess;
        const user = authStore.getState().user;

        // return false if there is no token
        if (!user) {
            console.log("you are not logged in");
            return false;
        }

        // return false if token is expired
        if (!this.authService.isAuthenticated()) {
            console.log("token is expired");
            return false;
        }

        // Return false if user role is not authorized
        if (user.role.role !== role) {
            console.log("you are not authorized");
            //   this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
