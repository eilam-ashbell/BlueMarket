import {
    Component,
    DoCheck,
} from "@angular/core";
import { Route, Router } from "@angular/router";
import { UserModel } from "src/app/models/user-model";
import { authStore } from "src/app/redux/auth-state";
import { AuthService } from "src/app/services/auth.service";
import { CartService } from "src/app/services/cart.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements DoCheck {
    public userData: UserModel = authStore.getState().user;

    constructor(private authService: AuthService, private router: Router, private cartService: CartService) {}

    ngDoCheck(): void {
        authStore.getState().token ?
        this.userData = authStore.getState().user :
        this.userData = null;
    }

    public get isCartOpen() {
        return this.cartService.isCartOpen;
    }
    
    public async logout(): Promise<void> {
        await this.authService.logout();
        this.router.navigate(['guest'])        
    }

    public cartClickHandler() {
        this.cartService.isCartOpen = !this.cartService.isCartOpen;
    }
}
