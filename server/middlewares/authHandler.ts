import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import dbConnection from "../config/db";
import UserEntity from "../entities/user.entity";
import ErrorHandler from "../utils/error";
import { DataStoredInToken } from "../interfaces/auth.interface";

const { SECRET_KEY } = process.env;

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
    try {
        const Authorization =
            (req.header("Authorization")
                ? req.header("Authorization")?.split("Bearer ")[1]
                : null) || req.cookies.Authorization;

        if (Authorization) {
            const secretKey: string = SECRET_KEY || "";
            const verificationResponse = verify(
                Authorization,
                secretKey
            ) as DataStoredInToken;
            const userId = verificationResponse.id;
            const user = dbConnection.getRepository(UserEntity);
            const findUser = await user.findOne({
                where: {
                    id: userId,
                },
            });

            if (findUser) {
                req.user = findUser;
                next();
            } else {
                next(new ErrorHandler(401, "Wrong authentication token"));
            }
        } else {
            next(new ErrorHandler(404, "Authentication token missing"));
        }
    } catch (error) {
        next(new ErrorHandler(401, "Wrong authentication token"));
    }
};

export default authMiddleware;
