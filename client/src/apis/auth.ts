import api from ".";

export const login = (email: string, password: string) =>
    api.post("/auth/login", { email, password });
export const signup = (email: string, password: string) =>
    api.post("/login", { email, password });
