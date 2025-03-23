import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Content } from "@/types";

const UserContentCard = ({ content }: { content: Content }) => {
  // Extract YouTube Video ID from the URL
  const videoId = new URL(content.youtubeUrl).searchParams.get("v");

  return (
    <Card key={content.id} className="shadow-lg">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
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
  );
};

export default UserContentCard;
