import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { File } from "../interfaces/file.interface";
import { Folder } from "../interfaces/folder.interface";

@Entity()
export default class FileEntity implements File {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({})
    size: number;

    @Column({})
    format: string;

    @Column()
    s3_url: string;

    @Column({ default: null })
    public_url?: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    uploaded_at: Date;

    @Column({ default: false })
    deleted: boolean;

    @ManyToOne("FolderEntity", "files", { onDelete: "CASCADE" })
    folder: Folder;
}
