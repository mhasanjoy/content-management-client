import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Content } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import DeleteContentModal from "./DeleteContentModal";
import EditContentModal from "./EditContentModal";

const UserProfileContentCard = ({ content }: { content: Content }) => {
  // Extract YouTube Video ID from the URL
  const videoId = new URL(content.youtubeUrl).searchParams.get("v");

  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <Card key={content.id} className="shadow-lg">
        <CardHeader className="flex items-center">
          <CardTitle>{content.title}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Pencil className="h-8 w-8 text-green-500 hover:text-green-700" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={() => setOpenDeleteModal(true)}
          >
            <Trash2 className="h-8 w-8 text-red-500 hover:text-red-700" />
          </Button>
        </CardHeader>
        <CardContent>
          {videoId ? (
            <iframe
              className="w-full h-80 rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={content.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <p className="text-gray-500">Invalid YouTube URL</p>
          )}
        </CardContent>
      </Card>

      {open && (
        <EditContentModal open={open} setOpen={setOpen} content={content} />
      )}

      {openDeleteModal && (
        <DeleteContentModal
          contentId={content.id}
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
        />
      )}
    </>
  );
};

export default UserProfileContentCard;
