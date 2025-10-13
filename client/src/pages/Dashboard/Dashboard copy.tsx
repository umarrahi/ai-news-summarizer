
import ArticleSummarizer from "@/components/ArticleSummarizer";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Printer, Share2, FileSpreadsheet } from "lucide-react";

// Mock data for generated summaries
const mockSummaries = [
  {
    id: 1,
    title: "AI Breakthrough in Natural Language Processing",
    originalUrl: "https://example.com/ai-breakthrough",
    summary: "Researchers at leading technology institutions have developed a revolutionary artificial intelligence model that demonstrates unprecedented understanding of complex human language patterns. This breakthrough represents a significant leap forward in natural language processing capabilities, with potential applications spanning from automated content creation to advanced conversational interfaces. The model's ability to comprehend context, nuance, and implicit meaning marks a crucial step toward more sophisticated AI systems that can interact with humans in increasingly natural ways.",
    keywords: ["AI", "Natural Language Processing", "Machine Learning", "Technology"],
    dateGenerated: "2024-01-15",
    wordCount: 1247,
    readingTime: "5 min"
  },
  {
    id: 2,
    title: "Global Climate Change Mitigation Strategies",
    originalUrl: "https://example.com/climate-strategies",
    summary: "A comprehensive analysis of current global climate change mitigation strategies reveals both promising developments and significant challenges ahead. International cooperation has led to innovative renewable energy solutions, carbon capture technologies, and sustainable development practices. However, the report emphasizes the urgent need for accelerated implementation of existing solutions and continued innovation in green technology sectors to meet ambitious climate targets set by the Paris Agreement.",
    keywords: ["Climate Change", "Renewable Energy", "Sustainability", "Environment"],
    dateGenerated: "2024-01-14",
    wordCount: 2156,
    readingTime: "8 min"
  },
];

const Dashboard = () => {
  const exportOptions = [
    { icon: FileText, label: "PDF", action: "pdf" },
    { icon: FileSpreadsheet, label: "Excel", action: "excel" },
    { icon: FileText, label: "Word", action: "word" },
    { icon: Printer, label: "Print", action: "print" },
    { icon: Share2, label: "Share", action: "share" },
  ];

  const handleExport = (summaryId: number, action: string) => {
    console.log(`Exporting summary ${summaryId} as ${action}`);
    // Export functionality would be implemented here
  };

  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <ArticleSummarizer />

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Generated Summaries</h1>
            <p className="text-muted-foreground">View and export your AI-generated article summaries</p>
          </div>

          {/* Summary Cards */}
          <div className="space-y-6">
            {mockSummaries.map((summary) => (
              <Card key={summary.id} className="border border-border bg-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-card-foreground mb-2">
                        {summary.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{summary.dateGenerated}</span>
                        <span>{summary.wordCount} words</span>
                        <span>{summary.readingTime} read</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Summary Text */}
                  <div className="prose prose-sm max-w-none">
                    <p className="text-card-foreground leading-relaxed">
                      {summary.summary}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2">
                    {summary.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  {/* Export Options */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {exportOptions.map((option) => (
                      <Button
                        key={option.action}
                        variant="outline"
                        size="sm"
                        className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleExport(summary.id, option.action)}
                      >
                        <option.icon className="w-4 h-4 mr-2" />
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State Message */}
          {mockSummaries.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No summaries yet</h3>
              <p className="text-muted-foreground">
                Create your first summary using the AI summarizer on the home page.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;