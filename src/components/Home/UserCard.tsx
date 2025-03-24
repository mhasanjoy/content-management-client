import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types";
import { Link } from "react-router";

const UserCard = ({ user }: { user: User }) => {
  return (
    <Card key={user.id} className="shadow-lg">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <p className="text-gray-500">{user.email}</p>
      </CardHeader>
      <CardContent>
        <Link to={`/users/${user.id}`}>
          <Button className="mt-3 w-full bg-blue-500 hover:bg-blue-600">
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserCard;
