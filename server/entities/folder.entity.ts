import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "../interfaces/file.interface";
import { Folder } from "../interfaces/folder.interface";

@Entity()
export default class FolderEntity implements Folder {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({})
    name: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    created_at: Date;

    @OneToMany("FileEntity", "folder")
    files?: File[];

    @Column({ default: false })
    deleted: boolean;
}
