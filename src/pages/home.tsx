import HeroSection from "@/components/Home/HeroSection";
import HomePageLoader from "@/components/Home/HomePageLoader";
import UserCard from "@/components/Home/UserCard";
import { useGetUserList } from "@/hooks/useGetUserList";

const Home = () => {
  const { data: users, isLoading, error } = useGetUserList();

  return (
    <div className="container mx-auto p-6">
      <HeroSection />

      <h2 className="text-2xl font-semibold mb-6 text-center">
        Registered Users
      </h2>

      {isLoading ? (
        <HomePageLoader />
      ) : error ? (
        <div className="text-red-500 text-center">Failed to load users.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users?.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
