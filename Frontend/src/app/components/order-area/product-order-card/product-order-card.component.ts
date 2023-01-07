import { Component, Input, OnInit } from "@angular/core";
import { CartProductModel } from "src/app/models/cart-product.model";
import { ProductModel } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { NotifyService } from "src/app/services/notify.service";
import { ProductsService } from "src/app/services/products.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-product-order-card",
    templateUrl: "./product-order-card.component.html",
    styleUrls: ["./product-order-card.component.css"],
})
export class ProductOrderCardComponent implements OnInit {
    @Input() cartProduct: CartProductModel;

    public productData: ProductModel = new ProductModel();
    public imgPath: string;

    constructor(
        private productsService: ProductsService,
        private cartService: CartService,
        private notifyService: NotifyService
    ) {}

    async ngOnInit(): Promise<void> {
        try {
            this.productData = await this.productsService.getProduct(
                this.cartProduct.productId
            );
            this.imgPath =
                environment.staticsRoute + this.productData.imageName;
        } catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public async deleteProduct() {
        try {
            await this.cartService.deleteProductFromCart(
                this.cartProduct.productId
            );
        } catch (err: any) {
            this.notifyService.error(err);
        }
    }
}
