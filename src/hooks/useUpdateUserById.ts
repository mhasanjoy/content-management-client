import { updateUserProfile } from "@/api/users";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

/** custom hook to update user profile */
export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["profile"],
        refetchType: "active",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
