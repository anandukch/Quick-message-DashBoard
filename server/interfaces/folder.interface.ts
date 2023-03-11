import { File } from "./file.interface";

export interface Folder {
    id: number;
    name: string;
    files?: File[];
}
