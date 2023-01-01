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

// get busy dates
async function getBusyDates(): Promise<any> {
    const dates = await OrderModel.aggregate([
        {
            // group orders by dates
            $group: {
                _id: {
                    // format date to yyyy-mm-dd
                    $dateToString: {
                        format: Date,
                        date: "$dateOfDelivery",
                    },
                },
                // count how much orders in each date
                count: { $sum: 1 },
            },
        },
        // filter out dates with less then 3 orders
        { $match: { _id: { $ne: null }, count: { $gte: 3 } } },
    ]);
    return dates;
}

export default {
    getAllRoles,
    getProductsCount,
    getOrdersCount,
    getBusyDates,
};
