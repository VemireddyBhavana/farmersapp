import React, { createContext, useContext, ReactNode } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";

interface User {
  username: string;
  phone: string;
  role: "Farmer" | "Owner" | "Admin";
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();

  const user: User | null = clerkUser ? {
    username: clerkUser.fullName || clerkUser.username || "User",
    phone: clerkUser.primaryPhoneNumber?.phoneNumber || "",
    role: (clerkUser.publicMetadata.role as any) || "Farmer",
  } : null;

  const login = () => {
    // With Clerk, login is handled by components, but we keep this for interface compatibility
  };

  const logout = async () => {
    await signOut();
  };

  const isAuthenticated = !!clerkUser;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
