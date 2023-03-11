import { sign } from "jsonwebtoken";
import { DataStoredInToken, TokenData } from "../interfaces/auth.interface";
import { User } from "../interfaces/users.interface";

const { SECRET_KEY } = process.env;

export const createToken = (user: User): TokenData => {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY || "";
    const expiresIn = "7d";
    return {
        expiresIn,
        token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
};

export const createCookie = (tokenData: TokenData): string =>
    `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
