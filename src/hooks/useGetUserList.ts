import { fetchUsers } from "@/api/users";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

/** custom hook to fetch users */
export const useGetUserList = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
