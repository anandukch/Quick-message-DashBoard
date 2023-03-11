import dbConnection from "../config/db";
import FileEntity from "../entities/file.entity";
import FolderEntity from "../entities/folder.entity";
import CampaignEntity from "../entities/campaign.entity";
import UserEntity from "../entities/user.entity";

const userSchema = dbConnection.getRepository(UserEntity);
const folderSchema = dbConnection.getRepository(FolderEntity);
const fileSchema = dbConnection.getRepository(FileEntity);
const CampaignSchema = dbConnection.getRepository(CampaignEntity);
export { userSchema, folderSchema, fileSchema, CampaignSchema };
