import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { TokenData } from "../interfaces/auth.interface";
import { User } from "../interfaces/users.interface";
import { createToken } from "../services/auth.service";
import { userSchema } from "../services/databse.service";
import ErrorHandler from "../utils/error";
import Controller, { IRoute, Methods } from "./controller";

export default class AuthController extends Controller {
    path = "/auth";

    routerMiddleWares = [];

    routes: IRoute[] = [
        {
            path: "/login",
            method: Methods.POST,
            handler: this.login,
            localMiddleWares: [],
        },
    ];

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new ErrorHandler(400, "Email and password are required");
            }
            const user: User = (await userSchema.findOne({
                where: { email },
            })) as User;
            if (!user) {
                return next(new ErrorHandler(401, "Wrong email or password"));
            }
            const isPasswordMatching: boolean = await compare(
                password,
                user.password
            );
            if (!isPasswordMatching) {
                return next(new ErrorHandler(401, "Wrong email or password"));
            }
            const tokenData: TokenData = createToken(user);
            return res.status(200).json({ token: tokenData.token });
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message));
        }
    }
}
