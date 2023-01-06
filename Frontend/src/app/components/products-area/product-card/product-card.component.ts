import { Component, Input, OnInit } from "@angular/core";
import { CartProductModel } from "src/app/models/cart-product.model";
import { ProductModel } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { NotifyService } from "src/app/services/notify.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent implements OnInit {
    @Input() product: ProductModel;

    public imagePath: string;
    public quantity: number = 1;

    constructor(
        private cartService: CartService,
        private notifyService: NotifyService
    ) {}

    ngOnInit(): void {
        this.imagePath = this.product.imageName
            ? environment.staticsRoute + this.product.imageName
            : null;
    }

    // increase quantity field by 1
    public increaseQuantity() {
        this.quantity < 9999 ? this.quantity++ : (this.quantity = 9999);
    }
    // decrease quantity field by 1
    // can't be less then 1
    public decreaseQuantity() {
        this.quantity <= 1 ? (this.quantity = 1) : this.quantity--;
    }
    public validation() {
        this.quantity > 9999 ? (this.quantity = 9999) : null;
        this.quantity < 1 ? (this.quantity = 1) : null;
    }

    public async addToCart(): Promise<void> {
        try {
            // Create new CartProductModel to add
            const productToAdd = new CartProductModel({
                quantity: this.quantity,
                totalPrice: this.quantity * this.product.price,
                productId: this.product._id,
            });
            // Add product to cart on server
            await this.cartService.addProductToCart(productToAdd);
        } catch (err: any) {
            this.notifyService.error(err);
        }
    }
}
