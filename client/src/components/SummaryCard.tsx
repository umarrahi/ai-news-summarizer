// client\src\components\SummaryCard.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Printer, Share2, FileSpreadsheet } from "lucide-react";

interface SummaryCardProps {
  id: string;
  title: string;
  originalUrl: string;
  summary: string;
  // keywords?: string[];
  dateGenerated: string;
  wordCount: number;
  readingTime: string;
  onExport: (summaryId: string, action: string) => void;
}

const exportOptions = [
  { icon: FileText, label: "PDF", action: "pdf" },
  { icon: FileText, label: "Word", action: "word" },
  { icon: Printer, label: "Print", action: "print" },
  { icon: Share2, label: "Share", action: "share" },
];

const SummaryCard = ({
  id,
  title,
  originalUrl,
  summary,
  // keywords = [],
  dateGenerated,
  wordCount,
  readingTime,
  onExport,
}: SummaryCardProps) => {
  // const keywordList = keywords || []; // ✅ Fallback to empty array

  return (
    <Card className="border border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl text-card-foreground mb-2">
              {title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{dateGenerated}</span>
              <span>{wordCount} words</span>
              <span>{readingTime} read</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary Text */}
        <div className="prose prose-sm max-w-none">
          <p className="text-card-foreground leading-relaxed">{summary}</p>
        </div>

        {/* Keywords */}
        {/* <div className="flex flex-wrap gap-2">
          {keywordList.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
            >
              {keyword}
            </span>
          ))}
        </div> */}

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          {exportOptions.map((option) => (
            <Button
              key={option.action}
              variant="outline"
              size="sm"
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onExport(id, option.action)}
            >
              <option.icon className="w-4 h-4 mr-2" />
              {option.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
