import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const UserDetailsLoader = ({ page }: { page: string }) => {
  return (
    <div className="container mx-auto p-6 my-10">
      {/* Bio Section Skeleton */}
      <Card className="mb-10">
        <CardHeader className="flex gap-4">
          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>

      {/* Content Section Skeleton */}
      <h2 className="text-xl font-semibold mb-6 text-center">
        {page === "profile" ? "Contents" : "Published Contents"}
      </h2>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {[...Array(2)].map((_, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-56 w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserDetailsLoader;
