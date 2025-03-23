import { fetchUserProfile } from "@/api/users";
import { UserProfile } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";

/** custom hook to get user by id */
export const useGetUserProfile = () => {
  const { token } = useAuthContext();

  return useQuery<UserProfile, Error>({
    queryKey: ["profile"],
    queryFn: () => fetchUserProfile(token),
    enabled: !!token, // only fetch if token exists
  });
};
