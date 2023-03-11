import api from ".";
import { Campaign } from "../types/campaign";

export const uploadCampaign = (campaign: Campaign) =>
    api.post("/campaigns", campaign);
export const getCampaign = () => api.get(`/campaigns`);
export const getCampaignContent = (id: string) => api.get(`/campaigns/${id}`);
export const deleteCampaignContent = (id: number) =>
    api.delete(`/campaigns/${id}`);
export const updateCampaign = (id: number, form: any) =>
    api.put(`/campaigns/${id}`, form);
