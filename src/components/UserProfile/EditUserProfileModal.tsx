import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserById";
import { User } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Textarea } from "../ui/textarea";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  bio: Yup.string().optional(),
});

const EditUserModal = ({
  user,
  onClose,
}: {
  user: User;
  onClose: () => void;
}) => {
  const { mutate: update } = useUpdateUserProfile();

  const handleUserUpdate = (values: {
    name: string;
    email: string;
    bio: string;
  }) => {
    try {
      update(values);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleUserUpdate(values)}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6 mt-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Field
              as={Input}
              name="name"
              placeholder="Enter your name..."
              className="mt-2"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Field
              as={Input}
              name="email"
              type="email"
              placeholder="Enter your email..."
              className="mt-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Field
              as={Textarea}
              name="bio"
              placeholder="Enter your bio..."
              className="mt-2 h-32"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Save"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserModal;
