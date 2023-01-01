import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CartProductModel } from "src/app/models/cart-product.model";
import { CartModel } from "src/app/models/cart.model";
import { ProductModel } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { environment } from "src/environments/environment";
import { Socket, io } from "socket.io-client";
import { authStore } from "src/app/redux/auth-state";
import { CartActionType, cartStore } from "src/app/redux/cart-state";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: 'app-admin-product-card',
  templateUrl: './admin-product-card.component.html',
  styleUrls: ['./admin-product-card.component.css']
})
export class AdminProductCardComponent {

    @Input() product: ProductModel;

    public imagePath: string;
    public quantity: number = 1;

    constructor(private productService: ProductsService) {}

    ngOnInit(): void {
        this.imagePath = this.product.imageName ? (environment.staticsRoute + this.product.imageName) : null;
    }

    public editProduct(): void {
        this.productService.setProductToEdit(this.product)
    }
    public get editedProduct() {
        return this.productService.getProductToEdit();
    }

}
