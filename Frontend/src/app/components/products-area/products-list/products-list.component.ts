import { Component, OnInit } from "@angular/core";
import { CategoryModel } from "src/app/models/category.model";
import { ProductModel } from "src/app/models/product.model";
import { ProductsService } from "src/app/services/products.service";

@Component({
    selector: "app-products-list",
    templateUrl: "./products-list.component.html",
    styleUrls: ["./products-list.component.css"],
})
export class ProductsListComponent implements OnInit {
    public productList: ProductModel[];
    public productsToDisplay: ProductModel[];
    public categories: CategoryModel[];

    constructor(private productsService: ProductsService) {}

    async ngOnInit(): Promise<void> {
        // get all products from server and save in local variable
        this.productList = await this.productsService.getAllProducts();
        this.productsToDisplay = [...this.productList];
        // get all categories from server and save in local variable
        this.categories = await this.productsService.getAllCategories();
    }

    public async filterByCategory(categoryId: string) {
        this.productsToDisplay = await this.productsService.getProductsFromCategory(categoryId);
    }


}
