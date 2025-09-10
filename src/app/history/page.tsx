"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Code2, 
  Loader2, 
  Search, 
  Trash2, 
  Eye,
  Calendar,
  Bug,
  Zap,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import ResultsDisplay from "@/components/ResultsDisplay";

interface CodeReview {
  id: number;
  userId: string;
  code: string;
  language: string;
  bugsCount: number;
  optimizationsCount: number;
  timeComplexity: string | null;
  spaceComplexity: string | null;
  analysisResult: any;
  createdAt: string;
  updatedAt: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [reviews, setReviews] = useState<CodeReview[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<CodeReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [selectedReview, setSelectedReview] = useState<CodeReview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/history");
    }
  }, [session, isPending, router]);

  // Fetch reviews
  useEffect(() => {
    if (session?.user) {
      fetchReviews();
    }
  }, [session]);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/reviews?limit=100", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      setReviews(data);
      setFilteredReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load review history");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter reviews
  useEffect(() => {
    let filtered = reviews;

    // Filter by language
    if (languageFilter !== "all") {
      filtered = filtered.filter((r) => r.language === languageFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((r) =>
        r.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  }, [searchQuery, languageFilter, reviews]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      toast.success("Review deleted successfully");
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    }
  };

  const handleViewDetails = (review: CodeReview) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  const getLanguages = () => {
    const languages = new Set(reviews.map((r) => r.language));
    return Array.from(languages);
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
              <p className="text-xs text-muted-foreground">Review History</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Page Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Button variant="ghost" size="sm" asChild className="mb-2">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Review History</h1>
              <p className="text-muted-foreground mt-2">
                Browse and manage your past code reviews
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-base px-4 py-2">
                {reviews.length} Total Reviews
              </Badge>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search in code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={languageFilter} onValueChange={setLanguageFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {getLanguages().map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reviews List */}
          {filteredReviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Code2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
                <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                  {reviews.length === 0
                    ? "Start analyzing code to build your review history"
                    : "No reviews match your search criteria"}
                </p>
                {reviews.length === 0 && (
                  <Button asChild>
                    <Link href="/#editor">Analyze Code</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Badge variant="outline">{review.language}</Badge>
                        </CardTitle>
                        <CardDescription className="mt-2 flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3" />
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Code Preview */}
                    <div className="bg-muted rounded-md p-3 max-h-24 overflow-hidden">
                      <code className="text-xs font-mono line-clamp-3">
                        {review.code}
                      </code>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Bug className="h-4 w-4 text-destructive" />
                        <span>{review.bugsCount} bugs</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span>{review.optimizationsCount} opts</span>
                      </div>
                    </div>

                    {/* Complexity */}
                    {review.timeComplexity && (
                      <div className="text-xs text-muted-foreground">
                        Time: {review.timeComplexity}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleViewDetails(review)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(review.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Badge variant="outline">{selectedReview?.language}</Badge>
              Review Details
            </DialogTitle>
            <DialogDescription>
              Analyzed on {selectedReview && new Date(selectedReview.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedReview?.analysisResult && (
            <div className="mt-4">
              <ResultsDisplay
                results={selectedReview.analysisResult}
                language={selectedReview.language}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

