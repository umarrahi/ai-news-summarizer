import { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Sparkles, Link as LinkIcon, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { createSummary, getAllSummaries, getSummaryById } from "@/services/api/articleSummarizer";
import { useChat } from "@/contexts/ChatContext";

const Dashboard = () => {
  const [articleUrl, setArticleUrl] = useState("");
  const [articleText, setArticleText] = useState("");
  const [summaries, setSummaries] = useState<any[]>([]);
  const [currentSummary, setCurrentSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { activeChatId } = useChat();

  // Fetch summaries on load
  // useEffect(() => {
  //   fetchSummaries();
  // }, []);

  useEffect(() => {
  if (!activeChatId) return;
  if (activeChatId === "new") {
    setCurrentSummary(null);
    return;
  }

  fetchSummaryById(activeChatId);
}, [activeChatId]);

const fetchSummaryById = async (id: string) => {
  try {
    const data = await getSummaryById(id);
    setCurrentSummary(data);
  } catch (err) {
    console.error(err);
  }
};

  // const fetchSummaries = async () => {
  //   try {
  //     const data = await getAllSummaries();
  //     setSummaries(data);
  //   } catch (err: any) {
  //     console.error(err);
  //     setError("Failed to load summaries.");
  //   }
  // };

  const handleSummarize = async () => {
    if (!articleUrl && !articleText) {
      setError("Please provide either an article URL or article text.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await createSummary({
        articleUrl: articleUrl || undefined,
        articleText: articleText || undefined,
      });

      setSummaries((prev) => [data, ...prev]);
      setArticleUrl("");
      setArticleText("");
    } catch (err: any) {
      console.error(err);
      setError("Failed to summarize article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <AppLayout>
      <div className="p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {activeChatId === "new" || !currentSummary ? (
            <Card className="w-full shadow-card">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Article Summarizer
                </CardTitle>
                <p className="text-muted-foreground">
                  Transform any article into a concise, intelligent summary
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="url" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="url" className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="text">Text</TabsTrigger>
                  </TabsList>

                  <TabsContent value="url" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="article-url">Article URL</Label>
                      <Input
                        id="article-url"
                        type="url"
                        placeholder="https://example.com/article"
                        value={articleUrl}
                        onChange={(e) => setArticleUrl(e.target.value)}
                        className="rounded-full"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="article-text">Article Text</Label>
                      <Textarea
                        id="article-text"
                        placeholder="Paste your article text here..."
                        value={articleText}
                        onChange={(e) => setArticleText(e.target.value)}
                        className="min-h-32 resize-none"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button
                  onClick={handleSummarize}
                  size="xl"
                  shape="pill"
                  variant="hero"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Summarize Article
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {currentSummary.articleUrl ? (
                    <a
                      href={currentSummary.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {currentSummary.articleUrl}
                    </a>
                  ) : (
                    "Manual Article"
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {currentSummary.summary}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
