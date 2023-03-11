import S3 from "aws-sdk/clients/s3";
import path from "path";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class S3Service {
    BUCKET = process.env.AWS_BUCKET_NAME;

    private static getS3Bucket(): any {
        return new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
    }

    public uploadFile(file: any, folder?: string) {
        let fileStream;
        if (file.path !== undefined)
            fileStream = fs.createReadStream(file.path);

        const params = {
            Bucket: this.BUCKET,
            Key: `${folder ?? ""}${uuidv4()}${
                path.parse(file.originalname).ext
            }`,
            Body: file.buffer === undefined ? fileStream : file.buffer,
        };

        return S3Service.getS3Bucket().upload(params).promise();
    }

    public getFiles(folder?: string) {
        const params = {
            Bucket: this.BUCKET,
            Prefix: folder,
        };
        return S3Service.getS3Bucket().listObjects(params).promise();
    }

    public deleteFile(url: string) {
        const params = {
            Bucket: this.BUCKET,
            Key: url.split(".com/")[1],
        };
        return S3Service.getS3Bucket().deleteObject(params).promise();
    }
}
