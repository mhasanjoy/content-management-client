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
import { useUpdateContent } from "@/hooks/useUpdateContent";
import { Content } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  youtubeUrl: Yup.string()
    .url("Invalid URL")
    .required("YouTube URL is required"),
  publiclyViewable: Yup.boolean(),
});

const EditContentModal = ({
  open,
  setOpen,
  content,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: Content;
}) => {
  const { mutate: update } = useUpdateContent();

  const handleUpdateContent = (values: {
    title: string;
    youtubeUrl: string;
    publiclyViewable: boolean;
  }) => {
    try {
      update({ contentId: content.id, ...values });
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
            <DialogTitle>Edit Content</DialogTitle>
          </DialogHeader>

          <Formik
            initialValues={{
              title: content.title || "",
              youtubeUrl: content.youtubeUrl || "",
              publiclyViewable: content.publiclyViewable || false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdateContent(values)}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Field
                    as={Input}
                    name="title"
                    placeholder="Enter content title..."
                    className="mt-2"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="youtubeUrl">YouTube Embed URL</Label>
                  <Field
                    as={Input}
                    name="youtubeUrl"
                    placeholder="Enter YouTube video link..."
                    className="mt-2"
                  />
                  <ErrorMessage
                    name="youtubeUrl"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={values.publiclyViewable}
                    onCheckedChange={(checked) =>
                      setFieldValue("publiclyViewable", checked)
                    }
                    className="cursor-pointer"
                    id="viewable"
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
                    {isSubmitting ? "Updating..." : "Update"}
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

export default EditContentModal;
