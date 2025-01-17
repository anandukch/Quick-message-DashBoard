import { Application, ErrorRequestHandler, RequestHandler } from "express";
import { Server as HttpServer } from "http";
import dbConnection from "./config/db";
import Controller from "./controller/controller";

export default class Server {
    public app: Application;

    private readonly port: number | string;

    constructor(app: Application, port: number | string) {
        this.app = app;
        this.port = port;
    }

    public start(): HttpServer {
        this.exceptionHandler();
        return this.app.listen(this.port, () => {
            console.log(
                `Server is running on ${this.port} in ${process.env.NODE_ENV} mode`
            );
        });
    }

    public connectToDatabase() {
        dbConnection.initialize();
    }

    private exceptionHandler(): void {
        process
            .on("uncaughtException", (err) => {
                console.error("Uncaught Exception: ", err);
            })
            .on("unhandledRejection", (reason, p) => {
                console.error(
                    "Unhandled Rejection at: Promise ",
                    p,
                    " reason: ",
                    reason
                );
            });
    }

    public loadGlobalMiddleWares(middlewares: RequestHandler[]): void {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }

    public loadControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use(
                controller.path,
                controller.routerMiddleWares,
                controller.setRoutes()
            );
        });
    }

    public loadErrorHandlers(
        errorHandlers: Array<RequestHandler | ErrorRequestHandler>
    ): void {
        errorHandlers.forEach((errorHandler) => {
            this.app.use(errorHandler);
        });
    }
}
