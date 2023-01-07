import express, { NextFunction, Request, Response } from "express";
import { CredentialsModel } from "../4-models/credentials-model";
import { UserModel } from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";

const router = express.Router();

// register user
router.post(
    "/register",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user = new UserModel(request.body);
            const token = await authLogic.register(user);
            response.status(201).json(token);
        } catch (err: any) {
            next(err);
        }
    }
);

// login user
router.post(
    "/login",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const credentials = new CredentialsModel(request.body);
            const token = await authLogic.login(credentials);
            response.json(token);
        } catch (err: any) {
            next(err);
        }
    }
);

router.post(
    "/check_id/",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const idNumber = request.body.idNumber;
            const isExist = await authLogic.checkId(idNumber);
            response.json(isExist);
        } catch (err: any) {
            next(err);
        }
    }
);
router.post(
    "/check_email/",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const email = request.body.email;
            const isExist = await authLogic.checkEmail(email);
            response.json(isExist);
        } catch (err: any) {
            next(err);
        }
    }
);

export default router;
