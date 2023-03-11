export interface CampaignDto {
    group_id: string;
    quick_message_preview_text: string;
    start_time_24: number;
    end_time_24: number;
    disable_close: boolean;
    branding_text: string;
    content: Array<any>;
}
