import { register } from "@/api/users";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// custom hook to handle register logic
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
