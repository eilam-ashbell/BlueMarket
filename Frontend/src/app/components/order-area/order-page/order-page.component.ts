import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
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
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import * as luhn from "luhn";

const MarkJs = require("mark.js");
declare const require: any;

@Component({
    selector: "app-order-page",
    templateUrl: "./order-page.component.html",
    styleUrls: ["./order-page.component.css"],
})
export class OrderPageComponent implements OnInit {

    @ViewChild('pdfContent', {static:false}) PDFelement: ElementRef

    public searchTerm: string = "";
    public cart: CartModel;
    public cartProduct: CartProductModel;
    public userData: UserModel;
    public order = new OrderModel();
    public minDate: Date;
    public busyDates: OrderModel[];

    public form = new FormGroup({
        city: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100),
        ]),
        street: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100),
        ]),
        dateOfDelivery: new FormControl("", [Validators.required]),
        ccNumber: new FormControl("", [
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.minLength(12),
            Validators.maxLength(20),
            this.luhnValidator,
        ]),
    });

    constructor(
        private productsService: ProductsService,
        private cartService: CartService,
        private utilsService: UtilsService
    ) {}

    async ngOnInit(): Promise<void> {
        this.cart = await this.cartService.getCurrentCart();
        this.order.cartId = this.cart._id;
        this.userData = authStore.getState().user;
        this.busyDates = await this.utilsService.getBusyDates();
        this.minDate = new Date();
        // this.busyDates = await this.utilsService.getBusyDates();
    }

    public calcTotalCartPrice() {
        if (this.cart?.cartProducts.length == 0) return 0;
        const prices = this.cart?.cartProducts.map((p) => p.totalPrice);
        this.order.totalPrice = prices?.reduce((a, b) => a + b);
        return this.order.totalPrice;
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
                this.form.controls.city.setValue(event.target.placeholder);
                break;
            case "street":
                this.form.controls.street.setValue(event.target.placeholder);
                break;
        }
    }

    filterBusyDates = (d: Date): boolean => {
        const time = d?.getTime();
        const filterDates = this.busyDates?.map((d) =>
            new Date(d._id).setHours(0)
        );
        if (d?.getDay() === 6) return false;
        return !filterDates?.find((x) => x == time);
    };

    //   todo - costume validator for date typing
    //   todo - delete if not working
    dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
        // Only highligh dates inside the month view.
        if (view === "month") {
            const date = cellDate?.getDate();
            // Highlight the 1st and 20th day of each month.
            return date === 1 || date === 20 ? "custom-date-class" : "";
        }

        return "";
    };

    // Costume validator for credit card number
    private luhnValidator(c: AbstractControl) {
        const isValid = luhn.validate(c.value);
        return isValid ? null : { luhnCheck: true };
    }

    public async submit() {
        // check if all form values are valid
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        // Assign data to order model
        this.order.city = this.form.controls.city.value;
        this.order.street = this.form.controls.street.value;
        this.order.dateOfDelivery = new Date(
            this.form.controls.dateOfDelivery.value
        );
        this.order.creditCard = this.form.controls.ccNumber.value;
        // Send order to server
        const placedOrder = await this.cartService.placeOrder(this.order);
        // todo - add notify and redirect
        console.log(placedOrder);
    }

    public createPDF(){
        this.utilsService.exportCartToPDF(this.PDFelement.nativeElement)
    }
}
