import { Component, EventEmitter, NgModule, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, Data } from "@angular/router";
import { CategoryModel } from "src/app/models/category.model";
import { ProductModel } from "src/app/models/product.model";
import { AuthState, authStore } from "src/app/redux/auth-state";
import { AuthService } from "src/app/services/auth.service";
import { CartService } from "src/app/services/cart.service";
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
    
    constructor(
        private productsService: ProductsService,
        private cartService: CartService
    ) {}

    async ngOnInit(): Promise<void> {
        // get all products from server and save in local variable
        this.productList = await this.productsService.getAllProducts();
        this.productsToDisplay = [...this.productList];
        // get all categories from server and save in local variable
        this.categories = await this.productsService.getAllCategories();
    }

    public async filterByCategory(categoryId: string) {
        categoryId === "all"
            ? (this.productsToDisplay = [...this.productList])
            : (this.productsToDisplay =
                  await this.productsService.getProductsFromCategory(
                      categoryId
                  ));
    }

    public onButtonGroupClick($event: any): void{
        let clickedElement = $event.target || $event.srcElement;
        if( clickedElement.nodeName === "BUTTON" ) {
          let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
          // if a Button already has Class: .active
          if( isCertainButtonAlreadyActive ) {
            isCertainButtonAlreadyActive.classList.remove("active");
          }
          clickedElement.className += " active";
        }
      }
}
