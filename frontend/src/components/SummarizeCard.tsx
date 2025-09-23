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