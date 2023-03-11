import { Request } from "express";
import { User } from "./users.interface";

export interface DataStoredInToken {
    id: number;
}

export interface TokenData {
    token: string;
    expiresIn: number | string;
}

export interface RequestWithUser extends Request {
    user: User;
}
