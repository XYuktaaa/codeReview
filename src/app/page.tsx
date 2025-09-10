"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';


import { useSession, signIn } from "next-auth/react";

// import { useSession, authClient } from '@/lib/auth-client';
import CodeReviewer from '@/components/CodeReviewer';
import ResultsDisplay from '@/components/ResultsDisplay';
import DarkModeToggle from '@/components/DarkModeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Code2, 
  Bug, 
  Zap, 
  Clock, 
  CheckCircle, 
  Github,
  ArrowRight,
  Sparkles,
  User,
  LogOut,
  LayoutDashboard,
  History
} from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import Link from 'next/link';

interface AnalysisResult {
  bugs: Array<{
    line: number | null;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    title: string;
    description: string;
    explanation: string;
  }>;
  optimizations: Array<{
    category: 'Performance' | 'Code Quality' | 'Best Practices' | 'Readability';
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
  }>;
  optimizedCode: string;
  timeComplexity: {
    overall: string;
    operations: Array<{
      name: string;
      complexity: string;
      explanation: string;
    }>;
  };
  spaceComplexity: {
    overall: string;
    explanation: string;
  };
}

export default function Home() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('javascript');

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error("Failed to sign out");
    } else {
      localStorage.removeItem("bearer_token");
      refetch();
      toast.success("Signed out successfully");
      router.push("/");
    }
  };

  const handleAnalyze = async (code: string, language: string) => {
    setIsLoading(true);
    setCurrentLanguage(language);
    setResults(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze code');
      }

      setResults(data.analysis);
      toast.success('Code analysis completed!');
      
      // Save to database if user is authenticated
      if (session?.user) {
        try {
          const token = localStorage.getItem("bearer_token");
          const saveResponse = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              code,
              language,
              bugsCount: data.analysis.bugs?.length || 0,
              optimizationsCount: data.analysis.optimizations?.length || 0,
              timeComplexity: data.analysis.timeComplexity?.overall || null,
              spaceComplexity: data.analysis.spaceComplexity?.overall || null,
              analysisResult: data.analysis,
            }),
          });

          if (saveResponse.ok) {
            toast.success('Review saved to your history!');
          }
        } catch (saveError) {
          console.error('Failed to save review:', saveError);
          // Don't show error to user, saving is optional
        }
      }
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to analyze code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">CodeReview AI</h1>
              <p className="text-xs text-muted-foreground">Powered by Google Gemini</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-3">
            {!isPending && session?.user ? (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden md:flex">
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="hidden md:flex">
                  <Link href="/history">
                    <History className="mr-2 h-4 w-4" />
                    History
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{session.user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{session.user.name}</p>
                        <p className="text-xs text-muted-foreground">{session.user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="md:hidden">
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="md:hidden">
                      <Link href="/history">
                        <History className="mr-2 h-4 w-4" />
                        History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="md:hidden" />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" />
            AI-Powered Code Analysis
          </Badge>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Find Bugs, Optimize Code, Instantly
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Paste your code and let our AI detect bugs, explain issues, suggest optimizations, 
            and analyze time/space complexity—all in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => document.getElementById('editor')?.scrollIntoView({ behavior: 'smooth' })}>
              Try It Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for comprehensive code analysis in one platform
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive mb-4">
                  <Bug className="h-6 w-6" />
                </div>
                <CardTitle>Bug Detection</CardTitle>
                <CardDescription>
                  Automatically identify bugs, errors, and potential issues with detailed explanations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle>Code Optimization</CardTitle>
                <CardDescription>
                  Get intelligent suggestions for performance improvements and best practices
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-500 mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle>Complexity Analysis</CardTitle>
                <CardDescription>
                  Understand time and space complexity of your algorithms with detailed breakdowns
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-500 mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <CardTitle>Optimized Code</CardTitle>
                <CardDescription>
                  Receive production-ready optimized versions of your code with all fixes applied
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Code Editor Section */}
      <section id="editor" className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Start Analyzing Your Code
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Paste your code below, select the language, and click analyze
            </p>
          </div>

          <CodeReviewer onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>
      </section>

      {/* Results Section */}
      {(results || isLoading) && (
        <section id="results" className="container px-4 py-16 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Analysis Results
              </h2>
              <p className="text-lg text-muted-foreground">
                {isLoading ? 'AI is analyzing your code...' : 'Review the findings below'}
              </p>
            </div>

            {isLoading ? (
              <Card className="w-full">
                <CardContent className="flex flex-col items-center justify-center py-20">
                  <div className="relative">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <Code2 className="absolute inset-0 m-auto h-8 w-8 text-primary" />
                  </div>
                  <p className="mt-6 text-lg font-medium">Analyzing your code...</p>
                  <p className="mt-2 text-sm text-muted-foreground">This may take a few seconds</p>
                </CardContent>
              </Card>
            ) : (
              <ResultsDisplay results={results} language={currentLanguage} />
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container px-4 py-16 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-4xl border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="flex flex-col items-center gap-6 p-12 text-center">
            <h2 className="text-3xl font-bold">Ready to improve your code?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Join thousands of developers using CodeReview AI to write better, 
              faster, and more efficient code.
            </p>
            <Button size="lg" onClick={() => document.getElementById('editor')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Analyzing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-semibold">CodeReview AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CodeReview AI. Powered by Google Gemini.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
