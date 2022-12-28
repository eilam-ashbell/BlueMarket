import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { authStore } from "../redux/auth-state";
import { NotifyService } from "./notify.service";

@Injectable({
    providedIn: "root",
})
export class RoleGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private notyf: NotifyService) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        // TODO - figure out roleAccess error
        // @ts-ignore: Unreachable code error
        const role = route.data.roleAccess;
        const user = authStore.getState().user;

        // return false if there is no token
        if (!user) {
            this.notyf.error("you are not logged in")
            console.log("you are not logged in");
            this.router.navigate(['guest']);
            return false;
        }

        // return false if token is expired
        if (!this.authService.isAuthenticated()) {
            this.notyf.error("you are not logged in")
            console.log("session token is expired");
            this.router.navigate(["guest"])
            return false;
        }

        // Return false if user role is not authorized
        if (user.role.role !== role) {
            this.notyf.error("you are not authorized")
            console.log("you are not authorized");
              this.router.navigate(['guest']);
            return false;
        }
        return true;
    }
}
