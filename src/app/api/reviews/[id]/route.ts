import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { codeReviews } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED'
      }, { status: 401 });
    }
    const userId = session.user.id;

    const { id } = await context.params;
    const reviewId = parseInt(id);
    
    if (!id || isNaN(reviewId)) {
      return NextResponse.json({ 
        error: 'Valid review ID is required',
        code: 'INVALID_ID'
      }, { status: 400 });
    }

    const review = await db.select()
      .from(codeReviews)
      .where(eq(codeReviews.id, reviewId))
      .limit(1);

    if (review.length === 0) {
      return NextResponse.json({ 
        error: 'Review not found',
        code: 'NOT_FOUND'
      }, { status: 404 });
    }

    if (review[0].userId !== userId) {
      return NextResponse.json({ 
        error: 'Forbidden: You do not own this review',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    return NextResponse.json(review[0], { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED'
      }, { status: 401 });
    }
    const userId = session.user.id;

    const { id } = await context.params;
    const reviewId = parseInt(id);
    
    if (!id || isNaN(reviewId)) {
      return NextResponse.json({ 
        error: 'Valid review ID is required',
        code: 'INVALID_ID'
      }, { status: 400 });
    }

    const review = await db.select()
      .from(codeReviews)
      .where(eq(codeReviews.id, reviewId))
      .limit(1);

    if (review.length === 0) {
      return NextResponse.json({ 
        error: 'Review not found',
        code: 'NOT_FOUND'
      }, { status: 404 });
    }

    if (review[0].userId !== userId) {
      return NextResponse.json({ 
        error: 'Forbidden: You do not own this review',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const deleted = await db.delete(codeReviews)
      .where(eq(codeReviews.id, reviewId))
      .returning();

    return NextResponse.json({
      message: 'Review deleted successfully',
      deletedId: reviewId,
      deletedReview: deleted[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}
