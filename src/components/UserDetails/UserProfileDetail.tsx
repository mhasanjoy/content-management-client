import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types";

const UserProfileDetail = ({ user }: { user: User }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{user.name}</CardTitle>
        <p className="text-gray-500">{user.email}</p>
      </CardHeader>
      {user.bio && (
        <CardContent className="text-gray-700 text-justify">
          {user.bio}
        </CardContent>
      )}
    </Card>
  );
};

export default UserProfileDetail;
