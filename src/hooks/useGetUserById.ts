import { fetchUserById } from "@/api/users";
import { UserProfile } from "@/types";
import { useQuery } from "@tanstack/react-query";

/** custom hook to get user by id */
export const useGetUserById = (userId: string) => {
  return useQuery<UserProfile, Error>({
    queryKey: ["userById", userId],
    queryFn: () => fetchUserById(userId),
  });
};
