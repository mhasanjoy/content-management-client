import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useRegister";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import * as Yup from "yup";

// define the validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match") // ✅ Ensure both passwords match
    .required("Confirm Password is required"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: register, isPending } = useRegister();

  const handleSubmit = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center bg-gray-50 py-16"
      style={{ minHeight: "calc(100vh - 128px" }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {/* Formik Form */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => (
            <Form>
              <div className="mb-4">
                <Label htmlFor="name">Name</Label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

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
                  className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500"
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

              <div className="mb-4 relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md pr-10"
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-3 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                disabled={!isValid || isPending}
              >
                {isPending ? "Registering..." : "Register"}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
