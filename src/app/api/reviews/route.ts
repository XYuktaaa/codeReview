import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { codeReviews } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const body = await request.json();
    
    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    const { code, language, bugsCount, optimizationsCount, timeComplexity, spaceComplexity, analysisResult } = body;

    if (!code || typeof code !== 'string' || code.trim() === '') {
      return NextResponse.json({ 
        error: "Code is required and must not be empty",
        code: "MISSING_CODE" 
      }, { status: 400 });
    }

    if (!language || typeof language !== 'string' || language.trim() === '') {
      return NextResponse.json({ 
        error: "Language is required and must not be empty",
        code: "MISSING_LANGUAGE" 
      }, { status: 400 });
    }

    const newReview = await db.insert(codeReviews).values({
      userId: userId,
      code: code.trim(),
      language: language.trim().toLowerCase(),
      bugsCount: bugsCount || 0,
      optimizationsCount: optimizationsCount || 0,
      timeComplexity: timeComplexity || null,
      spaceComplexity: spaceComplexity || null,
      analysisResult: analysisResult || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).returning();

    return NextResponse.json(newReview[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const language = searchParams.get('language');

    let query = db.select().from(codeReviews);

    if (language) {
      query = query.where(
        and(
          eq(codeReviews.userId, userId),
          eq(codeReviews.language, language.toLowerCase())
        )
      );
    } else {
      query = query.where(eq(codeReviews.userId, userId));
    }

    const results = await query
      .orderBy(desc(codeReviews.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}
