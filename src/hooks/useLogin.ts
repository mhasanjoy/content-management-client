import { login } from "@/api/users";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthContext } from "./useAuthContext";

// custom hook to handle login logic
export const useLogin = () => {
  const { setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      setIsAuthenticated(true);
      toast.error(data.message);

      const redirectPath = location.state?.from || "/";
      navigate(redirectPath, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
