import { deleteContent } from "@/api/contents";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

/** custom hook to delete user content */
export const useDeleteContent = () => {
  return useMutation({
    mutationFn: deleteContent,
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
