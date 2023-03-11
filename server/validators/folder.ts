import { body } from "express-validator";
import handleValidation from "../middlewares/validationHandler";

export default [
    body("name").isString().notEmpty().withMessage("name is required"),
    handleValidation,
];
