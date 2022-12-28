import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { CategoryModel } from "../models/category.model";
import { ProductModel } from "../models/product.model";

@Injectable({
    providedIn: "root",
})
export class ProductsService {

    private productToEdit = new BehaviorSubject<ProductModel>(undefined);
    public productToWatch = this.productToEdit.asObservable()

    constructor(private http: HttpClient) {}

    public setProductToEdit(product: ProductModel) {
        this.productToEdit.next(product)    
    }
    public getProductToEdit() {
        return this.productToEdit.getValue();
    }
    public clearProductToEdit() {
        this.productToEdit = undefined
    }

    // Get all products
    public async getAllProducts(): Promise<ProductModel[]> {
        const products = await firstValueFrom(
            this.http.get<ProductModel[]>(environment.productsRoute)
        );
        return products;
    }

    // Get product by id
    public async getProduct(productId: string): Promise<ProductModel> {
        const product = await firstValueFrom(
            this.http.get<ProductModel>(environment.productsRoute + '/' + productId)
        );
        return product;
    }

    // Get all categories
    public async getAllCategories(): Promise<CategoryModel[]> {
        const categories = await firstValueFrom(
            this.http.get<CategoryModel[]>(
                environment.productsRoute + "categories"
            )
        );
        return categories;
    }

    // Get all products from category X
    public async getProductsFromCategory(
        categoryId: string
    ): Promise<ProductModel[]> {
        const products = await firstValueFrom(
            this.http.get<ProductModel[]>(
                environment.productsRoute + "categories/" + categoryId
            )
        );
        return products;
    }

    // Get all products by search query
    public async getProductsBySearchQuery(
        query: string
    ): Promise<ProductModel[]> {
        const products = await firstValueFrom(
            this.http.get<ProductModel[]>(
                environment.productsRoute + "search/" + query
            )
        );
        return products;
    }

    // Add new product
    public async addProduct(product: ProductModel): Promise<void> {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("categoryId", product.categoryId.toString());
        formData.append("image", product.image);
        console.log(formData);
        
        // const addedProduct = await firstValueFrom(
        //     this.http.post<ProductModel>(environment.productsRoute, formData)
        // );
        // console.log(addedProduct);
    }

    // Update product
    public async updateProduct(product: ProductModel): Promise<void> {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("categoryId", product.categoryId.toString());
        formData.append("image", product.image);
        formData.append("imageName", product.imageName);
        const updatedProduct = await firstValueFrom(
            this.http.post<ProductModel>(
                environment.productsRoute + product._id,
                formData
            )
        );
        console.log(updatedProduct);
    }

    // Delete product by _id
    public async deleteProduct(_id: string): Promise<void> {
        await firstValueFrom(this.http.delete(environment.productsRoute + _id));
    }
}
