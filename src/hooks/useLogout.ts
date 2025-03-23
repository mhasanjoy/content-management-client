import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";

// custom hook to handle logout
export const useLogout = () => {
  const { setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    // clear token from localStorage
    localStorage.removeItem("accessToken");

    // reset context state
    setIsAuthenticated(false);

    // redirect to login page
    navigate("/");
  };

  return { logout };
};
