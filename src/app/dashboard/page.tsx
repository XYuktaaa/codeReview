"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Code2, 
  Loader2, 
  Bug, 
  Zap, 
  TrendingUp,
  Calendar,
  ArrowLeft,
  FileCode,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

interface Stats {
  totalReviews: number;
  totalBugs: number;
  totalOptimizations: number;
  averageBugsPerReview: string;
  averageOptimizationsPerReview: string;
  languagesBreakdown: Array<{
    language: string;
    count: number;
    percentage: number;
  }>;
  recentActivity: {
    last7Days: number;
    last30Days: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [session, isPending, router]);

  // Fetch stats
  useEffect(() => {
    if (session?.user) {
      fetchStats();
    }
  }, [session]);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/reviews/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to load dashboard statistics");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />

      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">CodeReview AI</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Page Header */}
          <div>
            <Button variant="ghost" size="sm" asChild className="mb-2">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Welcome back, {session.user.name}! Here's your code analysis overview.
                </p>
              </div>
              <Button asChild>
                <Link href="/#editor">Analyze New Code</Link>
              </Button>
            </div>
          </div>

          {stats && (
            <>
              {/* Key Metrics */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                    <FileCode className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalReviews}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Code snippets analyzed
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Bugs Found</CardTitle>
                    <Bug className="h-4 w-4 text-destructive" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-destructive">{stats.totalBugs}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Avg {stats.averageBugsPerReview} per review
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Optimizations</CardTitle>
                    <Zap className="h-4 w-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
                      {stats.totalOptimizations}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Avg {stats.averageOptimizationsPerReview} per review
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">This Month</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.recentActivity.last30Days}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stats.recentActivity.last7Days} in last 7 days
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Your code review activity over time</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last 7 Days</span>
                        <span className="font-medium">{stats.recentActivity.last7Days} reviews</span>
                      </div>
                      <Progress 
                        value={(stats.recentActivity.last7Days / Math.max(stats.totalReviews, 1)) * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last 30 Days</span>
                        <span className="font-medium">{stats.recentActivity.last30Days} reviews</span>
                      </div>
                      <Progress 
                        value={(stats.recentActivity.last30Days / Math.max(stats.totalReviews, 1)) * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">All Time</span>
                        <span className="font-medium">{stats.totalReviews} reviews</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Language Breakdown
                    </CardTitle>
                    <CardDescription>Languages you've analyzed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {stats.languagesBreakdown.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileCode className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No languages analyzed yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {stats.languagesBreakdown.slice(0, 5).map((lang) => (
                          <div key={lang.language} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="capitalize">
                                  {lang.language}
                                </Badge>
                                <span className="text-muted-foreground">{lang.count} reviews</span>
                              </div>
                              <span className="font-medium">{lang.percentage}%</span>
                            </div>
                            <Progress value={lang.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Get started with your code analysis journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
                      <Link href="/#editor">
                        <Code2 className="h-5 w-5 mb-2" />
                        <div className="text-left">
                          <div className="font-semibold">Analyze Code</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Paste code and get instant AI feedback
                          </div>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
                      <Link href="/history">
                        <FileCode className="h-5 w-5 mb-2" />
                        <div className="text-left">
                          <div className="font-semibold">View History</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Browse all your past code reviews
                          </div>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <BarChart3 className="h-5 w-5 mb-2" />
                        <div className="text-left">
                          <div className="font-semibold">Export Data</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Download your analysis reports
                          </div>
                        </div>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Empty State */}
              {stats.totalReviews === 0 && (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Code2 className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">Start Your First Review</h3>
                    <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                      You haven't analyzed any code yet. Start now to see your dashboard come to life
                      with insights and analytics!
                    </p>
                    <Button size="lg" asChild>
                      <Link href="/#editor">
                        Analyze Your First Code
                        <Code2 className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
