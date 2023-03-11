export interface File {
    id: number;
    size: number;
    format: string;
    s3_url: string;
    public_url?: string;
    uploaded_at: Date;
    deleted: boolean;
}
