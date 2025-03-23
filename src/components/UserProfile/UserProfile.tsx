import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import EditUserModal from "./EditUserProfileModal";

const UserProfileDetail = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="text-2xl">{user.name}</CardTitle>
        <p className="text-gray-500">{user.email}</p>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute right-6">
              <Pencil className="h-8 w-8 text-gray-500 hover:text-gray-700" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl w-full">
            <EditUserModal user={user} onClose={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
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
