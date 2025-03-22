import { User } from "@/api/users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

const UserCard = ({ user }: { user: User }) => {
  return (
    <Card key={user.id} className="shadow-lg">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">{user.email}</p>
        <Link to={`/users/${user.id}`}>
          <Button className="mt-3 w-full">View Profile</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserCard;
