import { body } from "express-validator";
import handleValidation from "../middlewares/validationHandler";

export default [
    body("group_id").isString().notEmpty().withMessage("group_id is required"),
    body("quick_message_preview_text")
        .isString()
        .notEmpty()
        .withMessage("quick_message_preview_text is required"),
    body("start_time_24")
        .isAlphanumeric()
        .notEmpty()
        .withMessage("start_time_24 is required"),
    body("end_time_24")
        .isAlphanumeric()
        .notEmpty()
        .withMessage("end_time_24 is required"),
    body("disable_close")
        .isBoolean()
        .notEmpty()
        .withMessage("disable_close is required"),
    body("branding_text")
        .isString()
        .notEmpty()
        .withMessage("branding_text is required"),
    body("content").isArray().notEmpty().withMessage("content is required"),
    handleValidation,
];
