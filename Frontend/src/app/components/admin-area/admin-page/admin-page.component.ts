import { Component, OnInit } from "@angular/core";
import { CategoryModel } from "src/app/models/category.model";
import { ProductModel } from "src/app/models/product.model";
import { NotifyService } from "src/app/services/notify.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
    selector: "app-admin-page",
    templateUrl: "./admin-page.component.html",
    styleUrls: ["./admin-page.component.css"],
})
export class AdminPageComponent implements OnInit {
    public productList: ProductModel[];
    public productsToDisplay: ProductModel[];
    public categories: CategoryModel[];
    public searchTerm: string;

    constructor(
        private productsService: ProductsService,
        private notifyService: NotifyService
    ) {}

    async ngOnInit(): Promise<void> {
        try {
            // get all categories from server and save in local variable
            this.categories = await this.productsService.getAllCategories();
            // get all products from server and save in local variable
            this.productList = await this.productsService.getAllProducts();
            this.productsToDisplay = [...this.productList];
        } catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public async filterByCategory(categoryId: string) {
        try {
            categoryId === "all"
                ? (this.productsToDisplay = [...this.productList])
                : (this.productsToDisplay =
                      await this.productsService.getProductsFromCategory(
                          categoryId
                      ));
        } catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public filterBySearchTerm() {
        this.searchTerm === ""
            ? this.filterByCategory("all")
            : (this.productsToDisplay = this.productList.filter((p) =>
                  p.name.includes(this.searchTerm)
              ));
        const isCertainButtonAlreadyActive = document.querySelector(".active");
        isCertainButtonAlreadyActive.classList.remove("active");
        document.querySelector(".all").classList.add("active");
    }

    public onButtonGroupClick($event: any): void {
        let clickedElement = $event.target || $event.srcElement;
        if (clickedElement.nodeName === "BUTTON") {
            let isCertainButtonAlreadyActive =
                clickedElement.parentElement.querySelector(".active");
            // if a Button already has Class: .active
            if (isCertainButtonAlreadyActive) {
                isCertainButtonAlreadyActive.classList.remove("active");
            }
            clickedElement.className += " active";
        }
    }

    public get editedProduct() {
        return this.productsService.getProductToEdit();
    }
}
