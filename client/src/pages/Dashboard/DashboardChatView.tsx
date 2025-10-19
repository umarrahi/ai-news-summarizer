// client/src/pages/Dashboard/DashboardChatView.tsx
import { useEffect, useState } from "react";
import { useChat } from "@/contexts/ChatContext";
import SummaryCard from "@/components/SummaryCard";
import { getSummaryById } from "@/services/api/articleSummarizer"; // ✅ Use single-fetch API
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Summary } from "@/types";

const DashboardChatView = () => {
  const { activeChatId } = useChat();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {

      if (!activeChatId) {
        setLoading(false);
        return;
      }
      // e.preventDefault();

      setLoading(true);
      setError(null);
      try {
        const data = await getSummaryById(activeChatId);
        setSummary(data);
      } catch (err: any) {
        console.error("Failed to fetch summary:", err);
        setError("Failed to load summary. It may have been deleted or you don't have access.");
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [activeChatId]);

  // Guard: should not happen if routing is correct, but safe
  if (!activeChatId) {
    return (
      <div className="p-6">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No summary selected.</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-[70vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="p-6">
        <Card className="p-6 text-center">
          <p className="text-destructive">{error || "Summary not found."}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-xl font-bold">{summary.title || "Untitled Summary"}</h1>
        <SummaryCard
          id={summary.id}
          title={summary.title}
          originalUrl={summary.originalUrl || ""}
          summary={summary.summary}
          // keywords={summary.keywords || []} // ✅ Critical: prevent undefined.map()
          dateGenerated={summary.dateGenerated || new Date(summary.createdAt).toLocaleDateString()}
          wordCount={summary.wordCount || 0}
          readingTime={summary.readingTime || "1 min read"}
          onExport={(id, action) => {
            console.log(`Exporting summary ${id} as ${action}`);
            // TODO: Implement shared export logic if needed
          }}
        />
      </div>
    </div>
  );
};

export default DashboardChatView;