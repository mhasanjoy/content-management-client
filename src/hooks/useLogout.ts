import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";

// custom hook to handle logout
export const useLogout = () => {
  const { setIsAuthenticated, setToken } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    // clear token from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // reset context state
    setIsAuthenticated(false);
    setToken(null);

    // redirect to login page
    navigate("/");
  };

  return { logout };
};
