import { useAuthContext } from "@/hooks/useAuthContext";
import { useLogout } from "@/hooks/useLogout";
import { CircleUserRound } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Header = () => {
  const { isAuthenticated } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-end bg-gray-800 px-16 h-16 text-white">
      <Link to="/" className="text-lg font-bold me-8">
        Home
      </Link>

      <div className="flex items-center">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <CircleUserRound size={32} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
