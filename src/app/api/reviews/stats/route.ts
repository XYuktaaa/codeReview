import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { codeReviews } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ 
        error: 'Unauthorized',
        code: 'AUTHENTICATION_REQUIRED' 
      }, { status: 401 });
    }
    const userId = session.user.id;

    // Fetch all reviews for the authenticated user
    const userReviews = await db.select()
      .from(codeReviews)
      .where(eq(codeReviews.userId, userId));

    // Calculate total reviews
    const totalReviews = userReviews.length;

    // Calculate total bugs and optimizations
    const totalBugs = userReviews.reduce((sum, r) => sum + (r.bugsCount || 0), 0);
    const totalOptimizations = userReviews.reduce((sum, r) => sum + (r.optimizationsCount || 0), 0);

    // Calculate languages breakdown
    const languageCounts = userReviews.reduce((acc, r) => {
      const lang = r.language || 'Unknown';
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const languagesBreakdown = Object.entries(languageCounts)
      .map(([language, count]) => ({
        language,
        count,
        percentage: totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count);

    // Calculate recent activity (last 7 and 30 days)
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const reviewsLast7Days = userReviews.filter(r => {
      const createdDate = new Date(r.createdAt);
      return createdDate >= sevenDaysAgo;
    }).length;

    const reviewsLast30Days = userReviews.filter(r => {
      const createdDate = new Date(r.createdAt);
      return createdDate >= thirtyDaysAgo;
    }).length;

    // Calculate averages
    const averageBugsPerReview = totalReviews > 0 
      ? (totalBugs / totalReviews).toFixed(2) 
      : "0.00";
    
    const averageOptimizationsPerReview = totalReviews > 0 
      ? (totalOptimizations / totalReviews).toFixed(2) 
      : "0.00";

    // Return stats object
    return NextResponse.json({
      totalReviews,
      totalBugs,
      totalOptimizations,
      averageBugsPerReview,
      averageOptimizationsPerReview,
      languagesBreakdown,
      recentActivity: {
        last7Days: reviewsLast7Days,
        last30Days: reviewsLast30Days
      }
    }, { status: 200 });

  } catch (error) {
    console.error('GET stats error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'INTERNAL_SERVER_ERROR'
    }, { status: 500 });
  }
}
