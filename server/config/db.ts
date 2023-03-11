import "reflect-metadata";
import { DataSource } from "typeorm";
import FileEntity from "../entities/file.entity";
import FolderEntity from "../entities/folder.entity";
import CampaignEntity from "../entities/campaign.entity";
import UserEntity from "../entities/user.entity";
// eslint-disable-next-line
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const dbConnection: DataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    // port: 3300,
    logger: "debug",
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: true,
    entities: [UserEntity, FolderEntity, FileEntity, CampaignEntity],
    subscribers: [],
    migrations: [],
});

export default dbConnection;
