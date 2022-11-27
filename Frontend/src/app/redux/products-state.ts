import { createStore } from "redux";
import { ProductModel } from "../models/product.model";

export class ProductsState {
    public products: ProductModel[] = [];
}

export enum ProductsActionType {
    FetchProducts = "FetchProducts", // Fetch all products
    AddProduct = "AddProduct", // Add new product to store
    UpdateProduct = "UpdateProduct", // Update exist product in store
    DeleteProduct = "DeleteProduct", // Delete exist product from store
}

export interface ProductsAction {
    type: ProductsActionType; // Which operation to execute
    payload: any; // Data to work with
}

export function productsReducer(
    currentState = new ProductsState(),
    action: ProductsAction
): ProductsState {
    const newState = { ...currentState };

    switch (action.type) {
        case ProductsActionType.FetchProducts: // payload = all vacations fetched
            newState.products = action.payload;
            break;
        case ProductsActionType.AddProduct: // payload = product to add
            newState.products.push(action.payload);
            break;
        case ProductsActionType.UpdateProduct: // payload = product to update
            const indexToUpdate = newState.products.findIndex(
                (p) => p._id === action.payload.productId
            );
            if (indexToUpdate >= 0) {
                newState.products[indexToUpdate] = action.payload;
            }
            break;
        case ProductsActionType.DeleteProduct: // payload = _id to delete
            const indexToDelete = newState.products.findIndex(
                (p) => p._id === action.payload
            );
            if (indexToDelete >= 0) {
                newState.products.splice(indexToDelete, 1);
            }
            break;
    }

    return newState
}

export const productsStore = createStore(productsReducer)
