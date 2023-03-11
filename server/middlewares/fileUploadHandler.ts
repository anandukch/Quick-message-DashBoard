import multer from "multer";

const imageFilter = (req: any, file: any, cb: any): void => {
    if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif|webp)$/)) {
        return cb(new Error("Only image and webp files are allowed!"), false);
    }
    return cb(null, true);
};

const uploadHandler = multer({
    storage: multer.memoryStorage(),
    fileFilter: imageFilter,
});

export default uploadHandler;
