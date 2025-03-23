import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateContent } from "@/hooks/useCreateContent";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  youtubeUrl: Yup.string()
    .url("Invalid URL")
    .required("YouTube URL is required"),
  publiclyViewable: Yup.boolean(),
});

const CreateContentModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutate: create } = useCreateContent();

  const handleCreateContent = (values: {
    title: string;
    youtubeUrl: string;
    publiclyViewable: boolean;
  }) => {
    try {
      create(values);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Create New Content</DialogTitle>
          </DialogHeader>
          <Formik
            initialValues={{
              title: "",
              youtubeUrl: "",
              publiclyViewable: true,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleCreateContent(values)}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Field
                    as={Input}
                    name="title"
                    placeholder="Enter content title..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="youtubeUrl">YouTube URL</Label>
                  <Field
                    as={Input}
                    name="youtubeUrl"
                    placeholder="Enter YouTube video link..."
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={values.publiclyViewable}
                    onCheckedChange={(checked) =>
                      setFieldValue("publiclyViewable", checked)
                    }
                    id="viewable"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="viewable" className="cursor-pointer">
                    Publicly Viewable
                  </Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer"
                  >
                    {isSubmitting ? "Creating..." : "Create"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateContentModal;
