import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink } from "lucide-react";

interface NewsCardProps {
  title: string;
  source: string;
  date: string;
  summary: string;
  imageUrl: string;
  category: string;
  readTime?: string;
}

const NewsCard = ({ 
  title, 
  source, 
  date, 
  summary, 
  imageUrl, 
  category,
  readTime = "2 min read"
}: NewsCardProps) => {
  return (
    <Card className="group hover:shadow-card transition-all duration-300 overflow-hidden bg-card">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge 
          variant="secondary" 
          className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm"
        >
          {category}
        </Badge>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="font-medium">{source}</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{date}</span>
          </div>
          <span>{readTime}</span>
        </div>

        {/* AI Summary */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">AI Summary</Badge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {summary}
          </p>
        </div>

        {/* Read More Button */}
        <Button 
          shape="pill" 
          variant="outline" 
          size="sm" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsCard;