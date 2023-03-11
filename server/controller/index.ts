import { NextFunction, Request, Response } from "express";
import Controller, { Methods, IRoute } from "./controller";
import ErrorHandler from "../utils/error";

export default class IndexController extends Controller {
    path = "";

    routerMiddleWares = [];

    routes: IRoute[] = [
        {
            path: "/",
            method: Methods.GET,
            handler: this.index,
            localMiddleWares: [],
        },
    ];

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            res.send("Server is running");
        } catch (err: any) {
            next(new ErrorHandler(500, err.message));
        }
    }
}
