import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import ItemsLogic from "../5-logic/shop-logic";

const router = express.Router();

// Get all Items
// GET http://localhost:3001/api/roles
router.get(
    "/roles",
    verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const roles = await ItemsLogic.getAllRoles();
            response.json(roles);
        } catch (err: any) {
            next(err);
        }
    }
);

// Get products count
// GET http://localhost:3001/api/products/count
router.get(
    "/products/count",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const productsCount = await ItemsLogic.getProductsCount();
            response.json(productsCount);
        } catch (err: any) {
            next(err);
        }
    }
);
// Get orders count
// GET http://localhost:3001/api/orders/count
router.get(
    "/orders/count",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const productsCount = await ItemsLogic.getProductsCount();
            response.json(productsCount);
        } catch (err: any) {
            next(err);
        }
    }
);

// // Get one item by _id
// // GET http://localhost:3001/api/Items/:_id
// router.get(
//     "/Items/:_id",
//     async (request: Request, response: Response, next: NextFunction) => {
//         try {
//             const _id = request.params._id;
//             const Item = await ItemsLogic.getOneItem(_id);
//             response.json(Item);
//         } catch (err: any) {
//             next(err);
//         }
//     }
// );



// // Update item by _id
// // PUT http://localhost:3001/api/Items/:_id
// router.put(
//     "/Items/:_id",
//     async (request: Request, response: Response, next: NextFunction) => {
//         try {
//             const _id = request.params._id;
//             request.body._id = _id;
//             const Item = new ItemModel(request.body);
//             const updatedItem = await ItemsLogic.updateItem(Item);
//             response.json(updatedItem);
//         } catch (err: any) {
//             next(err);
//         }
//     }
// );

// // Delete item by _id
// // DELETE http://localhost:3001/api/Items/:_id
// router.delete(
//     "/Items/:_id",
//     async (request: Request, response: Response, next: NextFunction) => {
//         try {
//             const _id = request.params._id;
//             await ItemsLogic.deleteItem(_id);
//             response.sendStatus(204);
//         } catch (err: any) {
//             next(err);
//         }
//     }
// );

export default router;
