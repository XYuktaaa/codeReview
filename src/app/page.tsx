import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Code, Zap, Bug, Lightbulb, ArrowRight, Database, Globe, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-muted/50 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Powered by Google Gemini AI</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Your AI-Powered
            <br />
            <span className="text-muted-foreground">Code Assistant</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Analyze, debug, optimize, and understand your code instantly with advanced AI. 
            Write better code faster with intelligent suggestions and explanations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/editor">
              <Button size="lg" className="w-full sm:w-auto">
                <Code className="w-4 h-4 mr-2" />
                Open Editor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <BookOpen className="w-4 h-4 mr-2" />
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Intelligent Code Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four powerful AI actions to help you write, understand, and improve your code
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze</h3>
              <p className="text-sm text-muted-foreground">
                Detect errors, bugs, and potential issues in your code with detailed analysis
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <Bug className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fix</h3>
              <p className="text-sm text-muted-foreground">
                Get corrected code with explanations of what was fixed and why
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Explain</h3>
              <p className="text-sm text-muted-foreground">
                Understand complex code with simple, clear explanations of how it works
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-chart-1/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-chart-1" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimize</h3>
              <p className="text-sm text-muted-foreground">
                Improve performance, readability, and follow best practices
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="container mx-auto px-4 py-20 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Full-stack application leveraging the latest tools and frameworks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Monaco Editor</h3>
              <p className="text-sm text-muted-foreground">
                Professional code editor with syntax highlighting for 10+ languages
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Persistent Storage</h3>
              <p className="text-sm text-muted-foreground">
                Save your code history and analyses for future reference
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cloud Deployed</h3>
              <p className="text-sm text-muted-foreground">
                Accessible anywhere with edge-optimized performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to improve your code?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start analyzing your code with AI-powered insights in seconds
          </p>
          <Link href="/editor">
            <Button size="lg">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">AI Code Assistant</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Built by Yukta as part of Full-Stack Web Development Course
            </p>
            <div className="flex gap-4">
              <Link href="/editor">
                <Button variant="ghost" size="sm">Editor</Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="sm">About</Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
