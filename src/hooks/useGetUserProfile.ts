import { fetchUserProfile } from "@/api/users";
import { UserProfile } from "@/types";
import { useQuery } from "@tanstack/react-query";

/** custom hook to get user by id */
export const useGetUserProfile = () => {
  return useQuery<UserProfile, Error>({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
  });
};
