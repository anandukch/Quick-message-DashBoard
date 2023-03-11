import { query } from "express-validator";
import handleValidation from "../middlewares/validationHandler";

export default [
    query("name").isString().withMessage("name is must include in query"),
    handleValidation,
];
