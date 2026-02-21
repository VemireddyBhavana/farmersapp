import api from "./api";

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: "farmer" | "owner" | "admin";
    avatar?: string;
    location?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export const authService = {
    async googleLogin(credential: string): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>("/auth/google", { credential });
        localStorage.setItem("sf_token", data.token);
        localStorage.setItem("sf_user", JSON.stringify(data.user));
        return data;
    },

    async register(payload: {
        name: string; email: string; phone?: string; password: string; role?: string;
    }): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>("/auth/register", payload);
        localStorage.setItem("sf_token", data.token);
        localStorage.setItem("sf_user", JSON.stringify(data.user));
        return data;
    },

    async login(email: string, password: string): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
        localStorage.setItem("sf_token", data.token);
        localStorage.setItem("sf_user", JSON.stringify(data.user));
        return data;
    },

    async getMe(): Promise<User> {
        const { data } = await api.get<User>("/auth/me");
        localStorage.setItem("sf_user", JSON.stringify(data));
        return data;
    },

    logout() {
        localStorage.removeItem("sf_token");
        localStorage.removeItem("sf_user");
    },

    getStoredUser(): User | null {
        try {
            const raw = localStorage.getItem("sf_user");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    getToken(): string | null {
        return localStorage.getItem("sf_token");
    },
};
