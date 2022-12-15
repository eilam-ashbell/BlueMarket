import { Component, Input, OnInit } from "@angular/core";
import { CartProductModel } from "src/app/models/cart-product.model";
import { CartModel } from "src/app/models/cart.model";
import { OrderModel } from "src/app/models/order.model";
import { ProductModel } from "src/app/models/product.model";
import { UserModel } from "src/app/models/user-model";
import { authStore } from "src/app/redux/auth-state";
import { AuthService } from "src/app/services/auth.service";
import { CartService } from "src/app/services/cart.service";
import { ProductsService } from "src/app/services/products.service";
import { UtilsService } from "src/app/services/utils.service";
import { environment } from "src/environments/environment";
const MarkJs = require("mark.js");
declare const require: any;

@Component({
    selector: "app-order-page",
    templateUrl: "./order-page.component.html",
    styleUrls: ["./order-page.component.css"],
})
export class OrderPageComponent implements OnInit {
    public searchTerm: string = "";
    public cart: CartModel;
    public cartProduct: CartProductModel;
    public userData: UserModel;
    public shipping = new OrderModel();
    public busyDates: string[];

    constructor(
        private productsService: ProductsService,
        private cartService: CartService,
        private utilsService: UtilsService
    ) {}

    async ngOnInit(): Promise<void> {
        this.cart = await this.cartService.getCurrentCart();
        this.shipping.cartId = this.cart._id;
        this.userData = authStore.getState().user;
        this.busyDates = await this.utilsService.getBusyDates();
    }

    public calcTotalCartPrice() {
        if (this.cart?.cartProducts.length == 0) return 0;
        const prices = this.cart?.cartProducts.map((p) => p.totalPrice);
        this.shipping.totalPrice = prices?.reduce((a, b) => a + b);
        return this.shipping.totalPrice;
    }

    // Highlight term on selected text elements
    public highlightText(searchTerm: string): void {
        // create new mark.js instance and define selector to search in
        const instance = new MarkJs(".product-name");
        // option object to costume mark design
        const options = {
            className: "highlight",
        };
        // execute
        instance.unmark({
            done: function () {
                instance.mark(searchTerm, options);
            },
        });
    }

    public setInputValue(event: any) {
        switch (event.target.name) {
            case "city":
                this.shipping.city = event.target.placeholder;
                break;
            case "street":
                this.shipping.street = event.target.placeholder;
                break;
        }
    }

    myHolidayFilter = (d: Date): boolean => {
        const dates = this.busyDates.map(d => new Date(d))
        const time = d.getTime();
        return !dates.find(x => x.getTime() == time);
    }

    public placeOrder() {
        console.log(this.shipping);
    }
}
