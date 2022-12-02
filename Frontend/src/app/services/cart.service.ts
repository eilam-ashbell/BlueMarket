import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { CartProductModel } from "../models/cart-product.model";
import { CartModel } from "../models/cart.model";
import { UserModel } from "../models/user-model";
import { authStore } from "../redux/auth-state";
import { AuthService } from "./auth.service";
@Injectable({
    providedIn: "root",
})
export class CartService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    // load user cart by cartId 
    public async getCurrentCart() {
        const userCartId = authStore.getState().user.cartId;
        if (!userCartId) {
            // todo - notify
            console.log('no cartId');
        }
        const currentCart = await firstValueFrom(this.http.post<CartModel>(environment.cartsRoute + 'current', {userCartId: userCartId}))
        return currentCart;
    }

    // Add new cart
    public async createNewCart(): Promise<CartModel> {
        const cartId = authStore.getState().user.cartId;
        const newCart = await firstValueFrom(this.http.post<CartModel>(environment.cartsRoute + "new", {cartId: cartId}))
        console.log(newCart);
        return newCart
      }
    
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
