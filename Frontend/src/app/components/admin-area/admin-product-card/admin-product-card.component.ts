import { Component, Input, OnInit } from "@angular/core";
import { ProductModel } from "src/app/models/product.model";
import { environment } from "src/environments/environment";
import { ProductsService } from "src/app/services/products.service";

@Component({
    selector: "app-admin-product-card",
    templateUrl: "./admin-product-card.component.html",
    styleUrls: ["./admin-product-card.component.css"],
})
export class AdminProductCardComponent implements OnInit {
    @Input() product: ProductModel;

    public imagePath: string;
    public quantity: number = 1;

    constructor(private productService: ProductsService) {}

    ngOnInit(): void {
        this.imagePath = this.product.imageName
            ? environment.staticsRoute + this.product.imageName
            : null;
    }

    public editProduct(): void {
        this.productService.setProductToEdit(this.product);
    }
    public get editedProduct() {
        return this.productService.getProductToEdit();
    }
}
