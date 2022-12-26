import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CartModel } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";
import { authStore } from "src/app/redux/auth-state";
import { cartStore } from "src/app/redux/cart-state";
import { UserModel } from "src/app/models/user-model";
import { Router } from "@angular/router";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {

    public cart: CartModel = cartStore.getState().cart;
    public user: UserModel = authStore.getState().user;
    public thereOlderCart: boolean = false

    constructor(private cartService: CartService, private router: Router) {}

    async ngOnInit(): Promise<void> {
        // Get current cart
        this.cart = await this.cartService.getCurrentCart();
        console.log(this.cart.cartProducts.length);
        const continueShopping = localStorage.getItem('continueShopping');
        if (this.cart.cartProducts.length > 0 && !continueShopping) {
            this.thereOlderCart = true;
        }
        // Create new cart if there is no cart
        if (!this.cart) {
            console.log(this.cart);
            console.log("New cart created!");
            this.cart = await this.cartService.createNewCart();
        }
    }

    public calcTotalCartPrice() {
        if (this.cart?.cartProducts.length == 0) return 0;
        const prices = this.cart?.cartProducts.map((p) => p.totalPrice);
        return prices?.reduce((a, b) => a + b);
    }

    public clearCart(): void {
        this.cartService.clearCart();
        this.thereOlderCart = false;
    }

    public continueShopping(): void {
        this.thereOlderCart = false
        localStorage.setItem('continueShopping', 'true')
    }

    public order(): void {
        this.router.navigate(["order", this.cart._id]);
    }
}
