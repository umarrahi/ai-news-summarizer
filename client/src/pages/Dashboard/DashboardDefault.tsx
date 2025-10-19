// // client/src/pages\Dashboard/DashboardDefault.tsx
// import { useState, useEffect } from "react";
// import AppLayout from "@/components/layouts/AppLayout";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Label } from "@/components/ui/label";
// import { Sparkles, Link as LinkIcon, Loader2, Copy } from "lucide-react";
// import { createSummary } from "@/services/api/articleSummarizer";
// import SummaryCard from "@/components/SummaryCard"; // ✅ Import your summary card component
// import { toast } from "react-hot-toast";


// const DashboardDefault = () => {
//   const [articleUrl, setArticleUrl] = useState("");
//   const [articleText, setArticleText] = useState("");
//   const [currentSummary, setCurrentSummary] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // ✅ Handle form submission
//   const handleSummarize = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!articleUrl && !articleText) {
//       setError("Please provide either an article URL or article text.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const data = await createSummary({
//         articleUrl: articleUrl || undefined,
//         articleText: articleText || undefined,
//       });

//       setCurrentSummary({
//         id: data.id || Date.now().toString(),
//         title: data.title || "Generated Summary",
//         originalUrl: data.articleUrl || "",
//         summary: data.summary || "No summary text provided.",
//         // keywords: data.keywords || ["AI", "Summary"],
//         dateGenerated: new Date().toLocaleDateString(),
//         wordCount: data.wordCount || 250,
//         readingTime: data.readingTime || "2 min",
//       });

//       setArticleUrl("");
//       setArticleText("");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to summarize article. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle export actions
//   const handleExport = (summaryId: string, action: string) => {
//     const content = currentSummary?.summary || "";

//     switch (action) {
//       case "pdf":
//         exportToPDF(content);
//         break;
//       case "word":
//         exportToWord(content);
//         break;
//       case "print":
//         window.print();
//         break;
//       case "share":
//         navigator.share
//           ? navigator.share({ text: content })
//           : toast.error("Sharing not supported in this browser.");
//         break;
//       default:
//         toast.error("Unknown export action.");
//     }
//   };

//   // ✅ Export as PDF
//   const exportToPDF = (text: string) => {
//     const blob = new Blob([text], { type: "application/pdf" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "summary.pdf";
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   // ✅ Export as Word
//   const exportToWord = (text: string) => {
//     const blob = new Blob([text], {
//       type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "summary.docx";
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   // ✅ Copy to clipboard
//   const handleCopy = () => {
//     if (currentSummary?.summary) {
//       navigator.clipboard.writeText(currentSummary.summary);
//       toast.success("Summary copied to clipboard!");
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="max-w-2xl mx-auto space-y-6">
//         {!currentSummary ? (
//           // ======================= FORM CARD =======================
//           <form onSubmit={handleSummarize}>
//             <Card className="w-full shadow-card">
//               <CardHeader className="text-center">
//                 <CardTitle className="flex items-center justify-center gap-2 text-2xl">
//                   <Sparkles className="w-6 h-6 text-primary" />
//                   Article Summarizer
//                 </CardTitle>
//                 <p className="text-muted-foreground">
//                   Transform any article into a concise, intelligent summary
//                 </p>
//               </CardHeader>

//               <CardContent className="space-y-6">
//                 <Tabs defaultValue="url" className="w-full">
//                   <TabsList className="grid w-full grid-cols-2">
//                     <TabsTrigger value="url" className="flex items-center gap-2">
//                       <LinkIcon className="w-4 h-4" />
//                       URL
//                     </TabsTrigger>
//                     <TabsTrigger value="text">Text</TabsTrigger>
//                   </TabsList>

//                   <TabsContent value="url" className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="article-url">Article URL</Label>
//                       <Input
//                         id="article-url"
//                         type="url"
//                         placeholder="https://example.com/article"
//                         value={articleUrl}
//                         onChange={(e) => setArticleUrl(e.target.value)}
//                         className="rounded-full"
//                       />
//                     </div>
//                   </TabsContent>

//                   <TabsContent value="text" className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="article-text">Article Text</Label>
//                       <Textarea
//                         id="article-text"
//                         placeholder="Paste your article text here..."
//                         value={articleText}
//                         onChange={(e) => setArticleText(e.target.value)}
//                         className="min-h-32 resize-none"
//                       />
//                     </div>
//                   </TabsContent>
//                 </Tabs>

//                 {error && <p className="text-red-500 text-sm">{error}</p>}

//                 <Button
//                   type="submit"
//                   size="xl"
//                   shape="pill"
//                   variant="hero"
//                   className="w-full"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin mr-2" />
//                       Summarizing...
//                     </>
//                   ) : (
//                     <>
//                       <Sparkles className="w-5 h-5 mr-2" />
//                       Summarize Article
//                     </>
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </form>
//         ) : (
//           // ======================= SUMMARY CARD =======================
//           <div className="space-y-4">
//             <SummaryCard
//               id={currentSummary.id}
//               title={currentSummary.title}
//               originalUrl={currentSummary.originalUrl}
//               summary={currentSummary.summary}
//               // keywords={currentSummary.keywords}
//               dateGenerated={currentSummary.dateGenerated}
//               wordCount={currentSummary.wordCount}
//               readingTime={currentSummary.readingTime}
//               onExport={handleExport}
//             />

//             <div className="flex justify-end gap-2">
//               <Button variant="secondary" onClick={handleCopy}>
//                 <Copy className="w-4 h-4 mr-2" />
//                 Copy Text
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={() => setCurrentSummary(null)}
//               >
//                 New Summary
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardDefault;

// client/src/pages/Dashboard/DashboardDefault.tsx
import { useState, useRef } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Sparkles, Link as LinkIcon, Loader2, Copy } from "lucide-react";
import { createSummary } from "@/services/api/articleSummarizer";
import SummaryCard from "@/components/SummaryCard"; // ✅ Import your summary card component
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import navigate for new summary

const DashboardDefault = () => {
  const [articleUrl, setArticleUrl] = useState("");
  const [articleText, setArticleText] = useState("");
  const [currentSummary, setCurrentSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize navigate

  // ✅ Handle form submission
  const handleSummarize = async (e: React.FormEvent) => {
    e.preventDefault();

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
      console.log("Generated summary >>> ", data)

      setCurrentSummary({
        id: data.id || Date.now().toString(),
        title: data.title || "Generated Summary",
        originalUrl: data.articleUrl || "",
        summary: data.summary || "No summary text provided.",
        // keywords: data.keywords || ["AI", "Summary"],
        // dateGenerated: new Date().toLocaleDateString(),
        dateGenerated: data.createdAt,
        wordCount: data.wordCount || 250,
        readingTime: data.readingTime || "2 min",
      });

      setArticleUrl("");
      setArticleText("");
    } catch (err) {
      console.error(err);
      setError("Failed to summarize article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Copy to clipboard
  const handleCopy = () => {
    if (currentSummary?.summary) {
      navigator.clipboard.writeText(currentSummary.summary);
      toast.success("Summary copied to clipboard!");
    } else {
        toast.error("Nothing to copy.");
    }
  };

  // ✅ Handle "New Summary" button click
  const handleNewSummary = () => {
      setCurrentSummary(null);
      // Optionally, you can navigate to the root dashboard path if needed
      // navigate("/dashboard");
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {!currentSummary ? (
          // ======================= FORM CARD =======================
          <form onSubmit={handleSummarize}>
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
                        placeholder="https://example.com/article  "
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
                  type="submit"
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
          </form>
        ) : (
          // ======================= SUMMARY CARD =======================
          <div className="space-y-4">
            <SummaryCard
              id={currentSummary.id}
              title={currentSummary.title}
              originalUrl={currentSummary.originalUrl}
              summary={currentSummary.summary}
              // keywords={currentSummary.keywords}
              dateGenerated={currentSummary.dateGenerated}
              wordCount={currentSummary.wordCount}
              readingTime={currentSummary.readingTime}
              onExport={() => {}} // Removed as export is handled inside SummaryCard
            />

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Text
              </Button>
              <Button
                variant="outline"
                onClick={handleNewSummary} // Use the new handler
              >
                New Summary
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDefault;