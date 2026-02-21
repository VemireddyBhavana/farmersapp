import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, type User } from "../services/auth.service";

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: { name: string; email: string; phone?: string; password: string; role?: string }) => Promise<void>;
    googleLogin: (credential: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Restore session on mount
    useEffect(() => {
        const token = authService.getToken();
        const stored = authService.getStoredUser();
        if (token && stored) {
            setUser(stored);
            // Refresh from API in background
            authService.getMe()
                .then(setUser)
                .catch(() => { authService.logout(); setUser(null); })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const { user } = await authService.login(email, password);
        setUser(user);
    };

    const register = async (data: Parameters<typeof authService.register>[0]) => {
        const { user } = await authService.register(data);
        setUser(user);
    };

    const googleLogin = async (credential: string) => {
        const { user } = await authService.googleLogin(credential);
        setUser(user);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, loading, login, register, googleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
