import UserContentCard from "@/components/UserDetails/UserDetailsContentCard";
import UserDetailsLoader from "@/components/UserDetails/UserDetailsLoader";
import UserProfileDetail from "@/components/UserProfile/UserProfile";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { useLogout } from "@/hooks/useLogout";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";

const Profile = () => {
  const { isAuthenticated } = useAuthContext();
  const { data: user, isLoading, isError, error } = useGetUserProfile();
  const location = useLocation();
  const { logout } = useLogout();

  useEffect(() => {
    if (isError) {
      toast(error.message);
      logout();
    }
  }, [isError]);

  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  if (isLoading) {
    return <UserDetailsLoader page="profile" />;
  }

  return (
    <div className="container mx-auto p-6 my-10">
      {user?.id && <UserProfileDetail user={user} />}

      <h2 className="text-xl font-semibold mb-6 text-center mt-10">Contents</h2>
      {user?.contents.length === 0 ? (
        <p className="text-gray-500 text-center">No content available.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {user?.contents.map((content) => (
            <UserContentCard key={content.id} content={content} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
