import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ height: "calc(100vh - 128px)" }}
    >
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-lg text-gray-600 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
