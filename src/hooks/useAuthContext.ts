import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

// custom hook to use authentication context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
