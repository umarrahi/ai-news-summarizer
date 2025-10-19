// client/src/components/SummaryCard.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Printer, Share2, FileSpreadsheet } from "lucide-react";
import jsPDF from 'jspdf'; // Import jsPDF
import html2canvas from 'html2canvas'; // Import html2canvas
import { Document, Packer, Paragraph, TextRun } from 'docx'; // For Word export

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

// --- Helper Functions for Export ---
const exportToPDF = async (title: string, summary: string, dateGenerated: string, wordCount: number, readingTime: string) => {
  try {
    // Create a temporary div for PDF content
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '210mm'; // A4 width
    tempDiv.style.padding = '20px';
    tempDiv.style.boxSizing = 'border-box';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.fontSize = '12px';
    tempDiv.style.lineHeight = '1.6';
    tempDiv.style.whiteSpace = 'pre-wrap'; // Preserve line breaks

    tempDiv.innerHTML = `
      <h1 style="font-size: 18px; margin-bottom: 10px; font-weight: bold;">${title}</h1>
      <p style="font-size: 10px; color: #666; margin-bottom: 15px;">Generated on: ${dateGenerated} | ${wordCount} words | ${readingTime} read</p>
      <div style="font-size: 12px; line-height: 1.6;">${summary}</div>
    `;

    document.body.appendChild(tempDiv);

    // Use html2canvas to convert the div to a canvas
    const canvas = await html2canvas(tempDiv);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add more pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${title || 'Summary'}.pdf`);
    document.body.removeChild(tempDiv);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Please try again.");
  }
};

const exportToWord = async (title: string, summary: string, dateGenerated: string, wordCount: number, readingTime: string) => {
  try {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: title,
                bold: true,
                size: 28, // Size in half-points
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Generated on: ${dateGenerated} | ${wordCount} words | ${readingTime} read`,
                size: 16, // Size in half-points
                color: "808080", // Gray color
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: summary,
                size: 20, // Size in half-points
              }),
            ],
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
     // Use browser's native download mechanism
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title || 'Summary'}.docx`;
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up
    URL.revokeObjectURL(url); // Clean up
    
  } catch (error) {
    console.error("Error generating Word document:", error);
    alert("Failed to generate Word document. Please try again.");
  }
};

const handleShare = async (title: string, summary: string, originalUrl: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: summary,
        url: originalUrl || undefined, // Include URL if available
      });
    } catch (error) {
      // Sharing failed or was cancelled
      console.error('Error sharing:', error);
      // Fallback: Copy to clipboard
      // navigator.clipboard.writeText(`${title}\n\n${summary}\n\n${originalUrl || ''}`);
      // toast.success("Content copied to clipboard for sharing.");
    }
  } else {
    // Fallback: Copy to clipboard
    try {
      const textToCopy = `${title}\n\n${summary}${originalUrl ? `\n\nOriginal URL: ${originalUrl}` : ''}`;
      await navigator.clipboard.writeText(textToCopy);
      alert("Content copied to clipboard! Please paste to share.");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy content. Please try again.");
    }
  }
};

// --- End Helper Functions ---

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
  onExport, // This prop might not be needed anymore if we handle exports directly here
}: SummaryCardProps) => {
  // const keywordList = keywords || []; // ✅ Fallback to empty array

  const handleExportClick = (action: string) => {
    switch (action) {
      case "pdf":
        exportToPDF(title, summary, dateGenerated, wordCount, readingTime);
        break;
      case "word":
        exportToWord(title, summary, dateGenerated, wordCount, readingTime);
        break;
      case "print":
        window.print();
        break;
      case "share":
        handleShare(title, summary, originalUrl);
        break;
      default:
        console.error("Unknown export action:", action);
    }
  };

  return (
    <Card className="border border-border bg-card" id={`summary-card-${id}`}> {/* Add ID for potential PDF capture */}
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
          <p className="text-sm text-card-foreground leading-relaxed whitespace-pre-wrap">{summary}</p> {/* Preserve line breaks */}
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
              onClick={() => handleExportClick(option.action)}
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