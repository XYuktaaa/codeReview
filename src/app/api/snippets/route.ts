import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { codeSnippet, analysis } from '@/db/schema';
import { eq, like, or, desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, language } = body;

    // Validate required fields
    if (!code) {
      return NextResponse.json(
        { error: 'Code is required', code: 'MISSING_CODE' },
        { status: 400 }
      );
    }

    if (!language) {
      return NextResponse.json(
        { error: 'Language is required', code: 'MISSING_LANGUAGE' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedCode = typeof code === 'string' ? code.trim() : code;
    const sanitizedLanguage = typeof language === 'string' ? language.trim() : language;

    // Validate sanitized inputs are not empty
    if (!sanitizedCode) {
      return NextResponse.json(
        { error: 'Code cannot be empty', code: 'EMPTY_CODE' },
        { status: 400 }
      );
    }

    if (!sanitizedLanguage) {
      return NextResponse.json(
        { error: 'Language cannot be empty', code: 'EMPTY_LANGUAGE' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Insert new code snippet
    const newSnippet = await db
      .insert(codeSnippet)
      .values({
        code: sanitizedCode,
        language: sanitizedLanguage,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(newSnippet[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    // Build base query
    let query = db.select().from(codeSnippet);

    // Apply search filter if provided
    if (search) {
      const searchCondition = or(
        like(codeSnippet.code, `%${search}%`),
        like(codeSnippet.language, `%${search}%`)
      );
      query = query.where(searchCondition);
    }

    // Apply ordering and pagination
    const snippets = await query
      .orderBy(desc(codeSnippet.createdAt))
      .limit(limit)
      .offset(offset);

    // Fetch analyses for each snippet
    const snippetsWithAnalyses = await Promise.all(
      snippets.map(async (snippet) => {
        const analyses = await db
          .select()
          .from(analysis)
          .where(eq(analysis.snippetId, snippet.id))
          .orderBy(desc(analysis.createdAt));

        return {
          ...snippet,
          analyses,
        };
      })
    );

    return NextResponse.json(snippetsWithAnalyses, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
