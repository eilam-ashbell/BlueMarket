import { Component, Input, OnInit } from "@angular/core";
import { CartProductModel } from "src/app/models/cart-product.model";
import { ProductModel } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { ProductsService } from "src/app/services/products.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-product-cart-card",
    templateUrl: "./product-cart-card.component.html",
    styleUrls: ["./product-cart-card.component.css"],
})
export class ProductCartCardComponent implements OnInit {
    @Input() cartProduct: CartProductModel;

    public productData: ProductModel = new ProductModel();
    public imgPath: string;

    constructor(private productsService: ProductsService, private cartService: CartService ) {}

    async ngOnInit(): Promise<void> {
        this.productData = await this.productsService.getProduct(
            this.cartProduct.productId
        );
        this.imgPath = environment.staticsRoute + this.productData.imageName;
    }

    public async deleteProduct() {
        await this.cartService.deleteProductFromCart(this.cartProduct.productId)
    }
}
