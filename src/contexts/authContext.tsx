import { refreshToken } from "@/api/users";
import React, { createContext, ReactNode, useEffect, useState } from "react";

// define types for authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  refreshAccessToken: () => Promise<void>;
}

// create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that wraps around your app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // fetch the access token from localStorage
  const getAccessToken = () => localStorage.getItem("accessToken");

  // check if the user is authenticated by verifying the token
  const isTokenValid = () => {
    const token = getAccessToken();
    return token !== null;
  };

  // refresh the token if expired
  const refreshAccessToken = async () => {
    try {
      const newAccessToken = await refreshToken();
      localStorage.setItem("accessToken", newAccessToken);
      setIsAuthenticated(true);
      setToken(newAccessToken);
    } catch (error) {
      console.error("Token refresh failed:", error);
      setIsAuthenticated(false);
      setToken(null);
    }
  };

  // check if the token is valid on app load
  useEffect(() => {
    if (isTokenValid()) {
      setIsAuthenticated(true);
      setToken(getAccessToken());
    } else {
      setIsAuthenticated(false);
      setToken(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        setIsAuthenticated,
        setToken,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
