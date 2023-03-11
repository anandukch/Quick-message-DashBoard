import { NextFunction, Request, Response } from "express";
import { File } from "../interfaces/file.interface";
import { Folder } from "../interfaces/folder.interface";
import authMiddleware from "../middlewares/authHandler";
import uploadHandler from "../middlewares/fileUploadHandler";
import S3Service from "../services/aws.service";
import { fileSchema, folderSchema } from "../services/databse.service";
import ErrorHandler from "../utils/error";
import folderValidator from "../validators/folder";
import Controller, { IRoute, Methods } from "./controller";

export default class FolderController extends Controller {
    path = "/folders";

    routerMiddleWares = [authMiddleware];

    routes: IRoute[] = [
        {
            path: "/",
            method: Methods.GET,
            handler: this.getAllFolders,
            localMiddleWares: [],
        },
        {
            path: "/",
            method: Methods.POST,
            handler: this.createFolder,
            localMiddleWares: folderValidator,
        },
        {
            path: "/:folderId",
            method: Methods.GET,
            handler: this.getFolder,
            localMiddleWares: [],
        },
        {
            path: "/:folderId",
            method: Methods.PUT,
            handler: this.updateFolder,
            localMiddleWares: [uploadHandler.single("file")],
        },
        {
            path: "/:folderId",
            method: Methods.DELETE,
            handler: this.deleteFolder,
            localMiddleWares: [],
        },
        {
            path: "/:folderId/:fileId",
            method: Methods.DELETE,
            handler: this.deleteFile,
            localMiddleWares: [],
        },
    ];

    async getAllFolders(req: Request, res: Response, next: NextFunction) {
        try {
            const folders: Folder[] = await folderSchema.find({
                where: { deleted: false },
            });
            return res.status(200).json(
                folders.map((folder) => ({
                    id: folder.id,
                    name: folder.name,
                }))
            );
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message));
        }
    }

    async createFolder(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            if (
                await folderSchema.findOne({
                    where: { name },
                })
            ) {
                return next(new ErrorHandler(400, "Folder already exists"));
            }
            const folder = folderSchema.create({
                name,
            });
            await folderSchema.save(folder);
            return res.status(200).json("Folder Created");
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message));
        }
    }

    async getFolder(req: Request, res: Response, next: NextFunction) {
        try {
            const { folderId } = req.params;
            const folder: Folder | null = await folderSchema.findOne({
                where: { id: parseInt(folderId, 10) },
                relations: ["files"],
            });
            if (!folder) {
                return next(new ErrorHandler(404, "Folder not found"));
            }
            folder.files = folder.files?.filter((file) => !file.deleted);
            return res.status(200).json(
                folder.files?.map((file) => ({
                    id: file.id,
                    size: file.size,
                    format: file.format,
                    s3_url: file.s3_url,
                    uploaded_at: file.uploaded_at,
                }))
            );
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message));
        }
    }

    async updateFolder(req: Request, res: Response, next: NextFunction) {
        try {
            const { folderId } = req.params;
            const { file } = req;
            const s3Service = new S3Service();
            const folder: Folder = (await folderSchema.findOne({
                where: { id: parseInt(folderId, 10) },
            })) as Folder;
            if (!folder) {
                return next(new ErrorHandler(404, "Folder not found"));
            }
            let fileRepo!: File;

            const s3Content = (await s3Service.uploadFile(file)) as any;

            if (s3Content !== undefined && file !== undefined) {
                fileRepo = fileSchema.create({
                    size: file.size,
                    format: file.mimetype,
                    s3_url: s3Content.Location,
                    folder,
                });
                await fileSchema.save(fileRepo);
                folder.files?.push(fileRepo);
            }

            await folderSchema.save(folder);

            return res.status(200).json(fileRepo);
        } catch (err: any) {
            console.log(err);

            return next(new ErrorHandler(500, err.message));
        }
    }

    async deleteFile(req: Request, res: Response, next: NextFunction) {
        try {
            const { fileId, folderId } = req.params;
            const file = await fileSchema.update(
                {
                    id: parseInt(fileId, 10),
                    folder: { id: parseInt(folderId, 10) },
                },

                { deleted: true }
            );
            if (!file) {
                return next(new ErrorHandler(404, "File not found"));
            }
            // let r = await fileSchema.findOne({
            //     where: { id: parseInt(fileId, 10) },
            // });
            // const s3Service = new S3Service();
            // await s3Service.deleteFile(r!.s3_url);
            // await fileSchema.delete({ id: parseInt(fileId, 10) });
            return res.status(200).json({ message: "File deleted" });
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message));
        }
    }

    async deleteFolder(req: Request, res: Response, next: NextFunction) {
        try {
            const { folderId } = req.params;
            const folder = await folderSchema.update(
                { id: parseInt(folderId, 10) },
                { deleted: true }
            );
            if (!folder) {
                return next(new ErrorHandler(404, "Folder not found"));
            }
            return res.status(200).json(folder);
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message));
        }
    }
}
