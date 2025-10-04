import { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Sparkles, Link as LinkIcon } from "lucide-react";
import { useEffect } from "react";
import { createSummary, getAllSummaries } from "@/services/api/articleSummarizer";

const Dashboard = () => {
  const [articleUrl, setArticleUrl] = useState("");
  const [articleText, setArticleText] = useState("");
  const [summaries, setSummaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch summaries on load
  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    try {
      const data = await getAllSummaries();
      setSummaries(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load summaries.");
    }
  };

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
          {/* Summarizer Input Card */}
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

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Summarize Button */}
              <Button
                onClick={handleSummarize}
                size="xl"
                shape="pill"
                variant="hero"
                className="w-full"
                disabled={loading}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {loading ? "Summarizing..." : "Summarize Article"}
              </Button>
            </CardContent>
          </Card>

          {/* Summarized Articles */}
          <div className="space-y-4">
            {summaries.map((item) => (
              <Card key={item.id} className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {item.articleUrl ? (
                      <a
                        href={item.articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {item.articleUrl}
                      </a>
                    ) : (
                      "Manual Article"
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {item.summary}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
