import { updateContent } from "@/api/contents";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

/** custom hook to update user content */
export const useUpdateContent = () => {
  return useMutation({
    mutationFn: updateContent,
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
