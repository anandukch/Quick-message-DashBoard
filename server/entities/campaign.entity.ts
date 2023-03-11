import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Campaign } from "../interfaces/campaign.interface";

@Entity()
export default class CampaignEntity implements Campaign {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    group_id: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    created_at: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    updated_at: Date;

    @Column()
    quick_message_preview_text: string;

    @Column()
    start_time_24: number;

    @Column()
    end_time_24: number;

    @Column()
    disable_close: boolean;

    @Column()
    branding_text: string;

    @Column({
        type: "longtext",
    })
    content: string;

    @Column({
        default: false,
    })
    deleted: boolean;
}
