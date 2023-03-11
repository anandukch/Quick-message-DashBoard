import api from ".";

export const getFolders = () => api.get("/folders");
export const getFolder = (id: number) => api.get(`/folders/${id}`);
export const createFolder = (name: string) => api.post("/folders", { name });
export const updateFolder = (id: number, form: any) =>
    api.put(`/folders/${id}`, form, {
        headers: {
            "content-type": "multipart/form-data",
        },
    });
export const deleteFolder = (id: number) => api.delete(`/folders/${id}`);
export const deleteFile = (fileId: number, folderId: number) =>
    api.delete(`/folders/${folderId}/${fileId}`);
