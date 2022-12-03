import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { CartProductModel } from "../models/cart-product.model";
import { CartModel } from "../models/cart.model";
import { authStore } from "../redux/auth-state";
import { Socket, io } from "socket.io-client";
import { CartActionType, cartStore } from "../redux/cart-state";

@Injectable({
    providedIn: "root",
})
export class CartService {
    constructor(private http: HttpClient) {}

    // Get user's current cart
    public async getCurrentCart(): Promise<CartModel> {
        const userCartId = authStore.getState().user.userCartId;
        if (!userCartId) {
            // todo - notify
            console.log("no cartId");
        }
        const currentCart = await firstValueFrom(
            this.http.post<CartModel>(environment.cartsRoute + "current", {
                userCartId: userCartId,
            })
        );

        // Place current cart in global state
        const action = {
            type: CartActionType.FetchCart,
            payload: currentCart,
        };
        cartStore.dispatch(action);

        return currentCart;
    }

    // Add new cart
    public async createNewCart(): Promise<CartModel> {
        const cartId = authStore.getState().user.userCartId;
        const newCart = await firstValueFrom(
            this.http.post<CartModel>(environment.cartsRoute + "new", {
                cartId: cartId,
            })
        );
        return newCart;
    }

    // Add product to cart
    public async addProductToCart(
        productToAdd: CartProductModel
    ): Promise<void> {
        // Get cart id
        const cartId = cartStore.getState().cart._id;
        // Add product to cart. Returns updated cart
        const updatedCart = await firstValueFrom(
            this.http.patch<CartModel>(
                environment.cartsRoute + "add-product/" + cartId,
                productToAdd
            )
        );
        // Update products in global state
        const action = {
            type: CartActionType.UpdateCartProducts,
            payload: updatedCart.cartProducts,
        };
        cartStore.dispatch(action);
    }

    // Delete product from cart
    public async deleteProductFromCart(productId: string): Promise<void> {
        // Get cart id
        const cartId = cartStore.getState().cart._id;
        // Add product to cart. Returns updated cart
        const updatedCart = await firstValueFrom(
            this.http.patch<CartModel>(
                environment.cartsRoute + "delete-product/" + cartId + "/" + productId, null)
        );
        // Update products in global state
        const action = {
            type: CartActionType.UpdateCartProducts,
            payload: updatedCart.cartProducts,
        };
        cartStore.dispatch(action);
    }
}
