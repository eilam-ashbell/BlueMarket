import {
    Component,
    DoCheck,
} from "@angular/core";
import { Route, Router } from "@angular/router";
import { UserModel } from "src/app/models/user-model";
import { authStore } from "src/app/redux/auth-state";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements DoCheck {
    public userData: UserModel = authStore.getState().user;

    constructor(private authService: AuthService, private router: Router) {}

    ngDoCheck(): void {
        authStore.getState().token ?
        this.userData = authStore.getState().user :
        this.userData = null;
    }

    public async logout(): Promise<void> {
        await this.authService.logout();
        this.router.navigate(['guest'])        
    }
}
