import { Component, Input, OnInit } from "@angular/core";
import { CartProductModel } from "src/app/models/cart-product.model";
import { CartModel } from "src/app/models/cart.model";
import { ProductModel } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
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

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.imagePath = environment.staticsRoute + this.product.imageName;
    }

    // increase quantity field by 1
    public increaseQuantity() {
        this.quantity++;
    }
    // decrease quantity field by 1
    // can't be less then 1
    public decreaseQuantity() {
        this.quantity === 1 ? (this.quantity = 1) : this.quantity--;
    }

    public async addToCart(): Promise<CartModel> {
        // Create new CartProductModel to add
        const productToAdd = new CartProductModel({
            quantity: this.quantity,
            totalPrice: this.quantity * this.product.price,
            productId: this.product._id,
        });
        // Add product to cart by cartId
        const updatedCart = await this.cartService.addProductToCart(
            productToAdd,
            "6377efb54e6b610caa1ab9e0"
        );
        // Return updated cart
        return updatedCart;
    }
}