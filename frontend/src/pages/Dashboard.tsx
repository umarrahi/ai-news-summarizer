// frontend\src\pages\Dashboard.tsx
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Sparkles, Link as LinkIcon } from "lucide-react";

const Dashboard = () => {
  const [articleUrl, setArticleUrl] = useState("");
  const [articleText, setArticleText] = useState("");

  const handleSummarize = () => {
    // Implementation for summarizing article
    console.log("Summarizing article...");
  };

  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-2xl mx-auto space-y-6">
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

              {/* Summarize Button */}
              <Button
                onClick={handleSummarize}
                size="xl"
                shape="pill"
                variant="hero"
                className="w-full"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Summarize Article
              </Button>
            </CardContent>
          </Card>
          
          {/* Summarized Articles will show below */}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;