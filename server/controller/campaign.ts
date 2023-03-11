import { NextFunction, Request, Response } from "express";
import { CampaignDto } from "../dtos/campaign.dto";
import authMiddleware from "../middlewares/authHandler";
import { CampaignSchema } from "../services/databse.service";
import ErrorHandler from "../utils/error";
import jsonBuilderValidator from "../validators/jsonBuilder";
import Controller, { IRoute, Methods } from "./controller";

export default class JsonBuilderController extends Controller {
    path = "/campaigns";

    routerMiddleWares = [authMiddleware];

    routes: IRoute[] = [
        {
            path: "/",
            method: Methods.GET,
            handler: this.getCampaigns,
            localMiddleWares: [],
        },
        {
            path: "/:id",
            method: Methods.GET,
            handler: this.getCampaign,
            localMiddleWares: [],
        },
        {
            path: "/",
            method: Methods.POST,
            handler: this.createCampaign,
            localMiddleWares: jsonBuilderValidator,
        },
        {
            path: "/:id",
            method: Methods.PUT,
            handler: this.updateCampaign,
            localMiddleWares: jsonBuilderValidator,
        },
        {
            path: "/:id",
            method: Methods.DELETE,
            handler: this.deleteCampaign,
            localMiddleWares: [],
        },
    ];

    async getCampaigns(req: Request, res: Response, next: NextFunction) {
        try {
            const campaigns = await CampaignSchema.find({
                where: { deleted: false },
            });
            return res.status(200).json(
                campaigns.map((campaign) => ({
                    id: campaign.id,
                    group_id: campaign.group_id,
                    branding_text: campaign.branding_text,
                    quick_message_preview_text:
                        campaign.quick_message_preview_text,
                }))
            );
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message));
        }
    }

    async getCampaign(req: Request, res: Response, next: NextFunction) {
        try {
            const campaign = (await CampaignSchema.findOne({
                where: { id: parseInt(req.params.id, 10) },
            })) as any;
            return res.status(200).json({
                id: campaign.id,
                group_id: campaign.group_id,
                quick_message_preview_text: campaign.quick_message_preview_text,
                branding_text: campaign.branding_text,
                start_time_24: campaign.start_time_24,
                end_time_24: campaign.end_time_24,
                disable_close: campaign.disable_close,
                content: JSON.parse(campaign.content),
            });
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message));
        }
    }

    async createCampaign(req: Request, res: Response, next: NextFunction) {
        try {
            /* eslint-disable @typescript-eslint/naming-convention */
            const {
                group_id,
                quick_message_preview_text,
                start_time_24,
                end_time_24,
                branding_text,
                disable_close,
                content,
            }: CampaignDto = req.body;

            const campaign = CampaignSchema.create({
                group_id,
                quick_message_preview_text,
                branding_text,
                start_time_24,
                end_time_24,
                disable_close,
                content: JSON.stringify(content),
            });

            await CampaignSchema.save(campaign);
            return res.status(200).json(campaign);
        } catch (err: any) {
            console.log(err);

            return next(new ErrorHandler(500, err.message));
        }
    }

    async updateCampaign(req: Request, res: Response, next: NextFunction) {
        try {
            const campaign = await CampaignSchema.findOne({
                where: {
                    id: parseInt(req.params.id, 10),
                },
            });
            if (!campaign) {
                return next(new ErrorHandler(404, "campaign not found"));
            }
            await CampaignSchema.update(campaign.id, {
                ...req.body,
                content: JSON.stringify(req.body.content),
                updated_at: new Date(),
            });
            return res.status(200).json(campaign);
        } catch (err: any) {
            console.log(err.message);

            return next(new ErrorHandler(500, err.message));
        }
    }

    async deleteCampaign(req: Request, res: Response, next: NextFunction) {
        try {
            const campaign = await CampaignSchema.update(
                { id: parseInt(req.params.id, 10) },
                { deleted: true }
            );
            if (!campaign) {
                return next(new ErrorHandler(404, "campaign not found"));
            }
            return res.status(200).json("Campaign deleted successfully");
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message));
        }
    }
}
