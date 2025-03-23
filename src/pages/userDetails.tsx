import UserProfile from "@/components/UserDetails/UserDetails";
import UserContentCard from "@/components/UserDetails/UserDetailsContentCard";
import UserDetailsLoader from "@/components/UserDetails/UserDetailsLoader";
import { useGetUserById } from "@/hooks/useGetUserById";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const UserDetails = () => {
  const { id } = useParams();
  const { data: user, isLoading, isError, error } = useGetUserById(id!);
  const navigate = useNavigate();

  if (isLoading) {
    return <UserDetailsLoader page="details" />;
  }

  if (isError) {
    toast(error.message);
    navigate("/");
  }

  return (
    <div className="container mx-auto p-6 my-10">
      {user?.id && <UserProfile user={user} />}

      <h2 className="text-xl font-semibold mb-6 text-center mt-10">
        Published Contents
      </h2>
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

export default UserDetails;
