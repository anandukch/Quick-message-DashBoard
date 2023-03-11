import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "../interfaces/users.interface";

@Entity()
export default class UserEntity implements User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
}
