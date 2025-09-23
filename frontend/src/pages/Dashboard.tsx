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
          {/* Summarized Articles Card */}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;