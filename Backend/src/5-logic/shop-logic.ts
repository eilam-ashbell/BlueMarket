import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import { OrderModel } from "../4-models/order-model";
import { IProductModel, ProductModel } from "../4-models/product-model";
import { IRoleModel, RoleModel } from "../4-models/role-model";

// Get all roles:
async function getAllItems(): Promise<IRoleModel[]> {
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

// // Get one Item:
// async function getOneItem(_id: string): Promise<IItemModel> {
//     const Item = await ItemModel.findById(_id).exec();
//     if (!Item) throw new IdNotFoundError(_id);
//     return Item;
// }

// // Add Item:
// async function addItem(Item: IItemModel): Promise<IItemModel> {
//     const errors = Item.validateSync();
//     if (errors) throw new ValidationError(errors.message);
//     return Item.save();
// }

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
    getAllItems,
    getProductsCount,
    getOrdersCount,
    // getOneItem,
    // addItem,
    // updateItem,
    // deleteItem,
};
