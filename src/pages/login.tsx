import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useLogin } from "@/hooks/useLogin";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import * as Yup from "yup";

// define the validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, error, isError } = useLogin();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      login(values);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast(error.message);
    }
  }, [isError, error?.message]);

  return (
    <div
      className="flex justify-center items-center bg-gray-50"
      style={{ height: "calc(100vh - 128px" }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Field
                id="email"
                name="email"
                type="email"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="mb-4 relative">
              <Label htmlFor="password">Password</Label>
              <Field
                id="password"
                name="password"
                type={showPassword ? "text" : "password"} // toggle between text and password input type
                className="w-full mt-2 p-3 border border-gray-300 rounded-md pr-10"
                placeholder="Enter your password"
              />

              <button
                type="button"
                className="absolute top-[46px] right-3 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)} // toggle password visibility
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Formik>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
