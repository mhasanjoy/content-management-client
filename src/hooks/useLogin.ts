import { login } from "@/api/users";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";

// custom hook to handle login logic
export const useLogin = () => {
  const { setIsAuthenticated, setToken } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setIsAuthenticated(true);
      setToken(data.accessToken);
      navigate("/");
    },
  });
};
