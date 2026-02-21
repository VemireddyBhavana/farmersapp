import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: { "Content-Type": "application/json" },
});

// Inject JWT token on every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("sf_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Global 401 handler
api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("sf_token");
            localStorage.removeItem("sf_user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
