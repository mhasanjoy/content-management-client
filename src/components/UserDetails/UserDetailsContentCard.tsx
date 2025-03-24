import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Content } from "@/types";

const UserContentCard = ({ content }: { content: Content }) => {
  return (
    <Card key={content.id} className="shadow-lg">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <iframe
          className="w-full h-80 rounded-lg"
          src={content.youtubeUrl}
          title={content.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </CardContent>
    </Card>
  );
};

export default UserContentCard;
