import Navbar from "@/components/layouts/LandingPage/Navbar";
import ArticleSummarizer from "@/components/ArticleSummarizer";
import Footer from "@/components/layouts/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Shield, Clock, Brain, Globe, Star, Award, Users, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section id="home">
        <div className="relative py-20 md:py-32">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-background to-background" />

          <div className="relative container mx-auto px-4 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-light/50 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              AI-Powered News Summarization
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Stay Informed with
              <span className="gradient-primary bg-clip-text text-transparent block">
                AI News Summaries
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Transform lengthy articles into concise, intelligent summaries.
              Save time while staying up-to-date with the news that matters most.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button variant="hero" size="xl" shape="pill" asChild>
                <Link to="/dashboard" className="group">
                  Start Summarizing
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" shape="pill">
                Watch Demo
              </Button>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Save Time</h3>
                <p className="text-muted-foreground text-sm">Get key insights in seconds instead of reading full articles</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">AI Powered</h3>
                <p className="text-muted-foreground text-sm">Advanced AI ensures accurate and meaningful summaries</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Real-time</h3>
                <p className="text-muted-foreground text-sm">Get summaries of breaking news as it happens</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Summarizer Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Try Our AI Summarizer</h2>
            <p className="text-muted-foreground">Get instant summaries of any article with our advanced AI technology</p>
          </div>
          <ArticleSummarizer />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">About NewsAI</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing how people consume news by leveraging cutting-edge AI technology
              to deliver concise, accurate summaries that save time and enhance understanding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Our Mission</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                In today's information-rich world, staying informed shouldn't mean spending hours reading lengthy articles.
                NewsAI was created to bridge the gap between comprehensive news coverage and time-efficient consumption.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our advanced AI algorithms analyze thousands of articles daily, extracting key insights and presenting
                them in digestible formats that preserve context and nuance while dramatically reducing reading time.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-2xl text-foreground mb-1">50K+</h4>
                <p className="text-muted-foreground text-sm">Active Users</p>
              </Card>
              <Card className="text-center p-6">
                <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-2xl text-foreground mb-1">1M+</h4>
                <p className="text-muted-foreground text-sm">Articles Summarized</p>
              </Card>
              <Card className="text-center p-6">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-2xl text-foreground mb-1">5M+</h4>
                <p className="text-muted-foreground text-sm">Hours Saved</p>
              </Card>
              <Card className="text-center p-6">
                <Star className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-2xl text-foreground mb-1">4.9/5</h4>
                <p className="text-muted-foreground text-sm">User Rating</p>
              </Card>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-card transition-shadow">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Advanced AI</h3>
              <p className="text-muted-foreground">
                State-of-the-art natural language processing ensures accurate and contextual summaries
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-card transition-shadow">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Get comprehensive summaries in seconds, not minutes. Instant results for immediate insights
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-card transition-shadow">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Global Coverage</h3>
              <p className="text-muted-foreground">
                Support for multiple languages and sources from around the world
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade as your needs grow. All plans include our core AI summarization features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="p-8 relative border-2 border-border">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">Free</CardTitle>
                <div className="text-4xl font-bold text-foreground mb-4">
                  $0<span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">Perfect for casual readers</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">10 summaries per day</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Basic AI summarization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Web-based access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Export as text</span>
                  </div>
                </div>
                <Button variant="outline" size="lg" shape="pill" className="w-full mt-8">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="p-8 relative border-2 border-primary bg-gradient-to-br from-primary/5 to-transparent">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Most Popular
                </div>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">Premium</CardTitle>
                <div className="text-4xl font-bold text-foreground mb-4">
                  $19<span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">For power users and professionals</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Unlimited summaries</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Advanced AI with context</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Keyword extraction</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Export to PDF, Word, Excel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Priority support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">API access</span>
                  </div>
                </div>
                <Button variant="hero" size="lg" shape="pill" className="w-full mt-8">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Have questions about NewsAI? We'd love to hear from you.
            Our team is here to help you get the most out of our platform.
          </p>
          <Button variant="hero" size="xl" shape="pill">
            Contact Support
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
