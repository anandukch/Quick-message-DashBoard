const generateFileType = (itemType: string) => {
    if (itemType === "jpeg" || itemType === "png" || itemType === "jpg") {
        return "IMAGE";
    }
    if (itemType === "gif") {
        return "GIF";
    }
    if (itemType === "webp") {
        return "STICKER";
    }
    return "IMAGE";
};

export default generateFileType;
