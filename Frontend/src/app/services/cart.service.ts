import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { CartProductModel } from "../models/cart-product.model";
import { CartModel } from "../models/cart.model";

@Injectable({
    providedIn: "root",
})
export class CartService {
    constructor(private http: HttpClient) {}

    // Add product to cart
    public async addProductToCart(
        cartProduct: CartProductModel,
        cartId: string
    ): Promise<CartModel> {
        // Add product to cart. Returns updated cart model
        const updatedCart = await firstValueFrom(
            this.http.patch<CartModel>(
                environment.cartsRoute + "addproduct/" + cartId,
                cartProduct
            )
        );
        return updatedCart;
    }
}
