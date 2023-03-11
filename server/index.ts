/* eslint import/newline-after-import: "off" */
/* eslint import/first: "off" */
import { config } from "dotenv";
config();
import express, { RequestHandler, ErrorRequestHandler } from "express";
import logger from "morgan";
import cors from "cors";
import IndexController from "./controller";
import AuthController from "./controller/auth";
import Controller from "./controller/controller";
import FolderController from "./controller/folder";
import { errorHandler, Handler404 } from "./middlewares/errorHandler";
import Server from "./server";
import JsonBuilderController from "./controller/campaign";

const app = express();
const server = new Server(app, (process.env.PORT as string) || 3001);

const controllers: Controller[] = [
    new IndexController(),
    new AuthController(),
    new FolderController(),
    new JsonBuilderController(),
];

const globalMiddlewares: RequestHandler[] = [
    express.json(),
    express.urlencoded({ extended: true }),
    logger("dev"),
    cors({
        origin: [process.env.DOMAIN as string],
    }),
];

const errorHandlers: Array<RequestHandler | ErrorRequestHandler> = [
    Handler404,
    errorHandler,
];
server.connectToDatabase();

server.loadGlobalMiddleWares(globalMiddlewares);

server.loadControllers(controllers);

server.loadErrorHandlers(errorHandlers);

server.start();
