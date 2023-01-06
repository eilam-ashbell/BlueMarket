import { createStore } from "redux";
import { CartModel } from "../models/cart.model";
export class CartState {
    public cart: CartModel;
}

export enum CartActionType {
    FetchCart = "FetchCart", // Fetch cart
    UpdateCartProducts = "UpdateCartProducts", // update products in cart
    CloseCart = "CloseCart", // close cart after ordering
}

export interface CartAction {
    type: CartActionType; // Which operation to execute
    payload: any; // Data to work with
}

export function cartReducer(
    currentState = new CartState(),
    action: CartAction
): CartState {
    const newState = { ...currentState };

    switch (action.type) {
        case CartActionType.FetchCart: // payload = cart model;
            newState.cart = action.payload;
            break;
        case CartActionType.UpdateCartProducts: // payload = array of product cart model
            newState.cart.cartProducts = action.payload;
            break;
        case CartActionType.CloseCart: // no payload needed
            newState.cart.isOrdered = true;
            break;
    }

    return newState;
}

export const cartStore = createStore(cartReducer);
