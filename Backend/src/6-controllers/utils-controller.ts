import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import utilsLogic from "../5-logic/utils-logic";
import ItemsLogic from "../5-logic/utils-logic";

const router = express.Router();

// Get all roles
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
            const ordersCount = await ItemsLogic.getOrdersCount();
            response.json(ordersCount);
        } catch (err: any) {
            next(err);
        }
    }
);

// get busy dates
router.get(
    "/orders/delivery/busy",
    verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const dates = await utilsLogic.getBusyDates();
            response.json(dates);
        } catch (err: any) {
            next(err);
        }
    }
);

export default router;
