import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { CartModel } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";
import { environment } from "src/environments/environment";
import { authStore } from "src/app/redux/auth-state";
import { cartStore } from "src/app/redux/cart-state";
import { UserModel } from "src/app/models/user-model";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {

    public cart: CartModel = cartStore.getState().cart;
    public user: UserModel = authStore.getState().user;

    constructor(private cartService: CartService) {}

    async ngOnInit(): Promise<void> {
        // Get current cart
        this.cart = await this.cartService.getCurrentCart();
        // Create new cart if there is no cart
        if (!this.cart) {
            console.log(this.cart);
            console.log('New cart created!');
            this.cart = await this.cartService.createNewCart();
        }
        console.log(cartStore.getState().cart);
    }

}
