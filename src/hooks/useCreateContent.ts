import { createContent } from "@/api/contents";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

/** custom hook to create user content */
export const useCreateContent = () => {
  return useMutation({
    mutationFn: createContent,
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
