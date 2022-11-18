// import { ICartItemModel } from "../4-models/cart-item-model";
import { CartProductModel } from "../4-models/cart-product-model";
import { CartModel, ICartModel } from "../4-models/cart-model";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import { OrderModel } from "../4-models/order-model";
import { IProductModel, ProductModel } from "../4-models/product-model";
import { IRoleModel, RoleModel } from "../4-models/role-model";

// Get all roles:
async function getAllRoles(): Promise<IRoleModel[]> {
    return RoleModel.find().exec();
}

// Get products count:
async function getProductsCount(): Promise<number> {
    return ProductModel.countDocuments().exec();
}

// Get orders count:
async function getOrdersCount(): Promise<number> {
    return OrderModel.countDocuments().exec();
}



// // Update Item:
// async function updateItem(Item: IItemModel): Promise<IItemModel> {
//     const errors = Item.validateSync();
//     if (errors) throw new ValidationError(errors.message);
//     const updatedItem = await ItemModel.findByIdAndUpdate(Item._id, Item, {
//         returnOriginal: false,
//     }).exec(); // { returnOriginal: false } --> return back db Item and not argument Item.
//     if (!updatedItem) throw new IdNotFoundError(Item._id);
//     return updatedItem;
// }

// // Delete Item:
// async function deleteItem(_id: string): Promise<void> {
//     const deletedItem = await ItemModel.findByIdAndDelete(_id).exec();
//     if (!deletedItem) throw new IdNotFoundError(_id);
// }

export default {
    getAllRoles,
    getProductsCount,
    getOrdersCount,
    // getOneItem,
    // addItem,
    // updateItem,
    // deleteItem,
};
