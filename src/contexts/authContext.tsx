import React, { createContext, ReactNode, useEffect, useState } from "react";

// define types for authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

// create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that wraps around your app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // fetch the access token from localStorage
  const getAccessToken = () => localStorage.getItem("accessToken");

  // check if the user is authenticated by verifying the token
  const isTokenValid = () => {
    const token = getAccessToken();
    return token !== null;
  };

  // check if the token is valid on app load
  useEffect(() => {
    if (isTokenValid()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
