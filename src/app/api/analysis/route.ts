import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { analysis, codeSnippet } from '@/db/schema';
import { eq } from 'drizzle-orm';

const VALID_ANALYSIS_TYPES = ['analyze', 'fix', 'explain', 'optimize'] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { snippetId, analysisType, prompt, response } = body;

    // Validate required fields
    if (!snippetId) {
      return NextResponse.json(
        { error: 'snippetId is required', code: 'MISSING_SNIPPET_ID' },
        { status: 400 }
      );
    }

    if (!analysisType) {
      return NextResponse.json(
        { error: 'analysisType is required', code: 'MISSING_ANALYSIS_TYPE' },
        { status: 400 }
      );
    }

    if (!prompt) {
      return NextResponse.json(
        { error: 'prompt is required', code: 'MISSING_PROMPT' },
        { status: 400 }
      );
    }

    if (!response) {
      return NextResponse.json(
        { error: 'response is required', code: 'MISSING_RESPONSE' },
        { status: 400 }
      );
    }

    // Validate snippetId is a valid integer
    const parsedSnippetId = parseInt(snippetId);
    if (isNaN(parsedSnippetId)) {
      return NextResponse.json(
        { error: 'snippetId must be a valid integer', code: 'INVALID_SNIPPET_ID' },
        { status: 400 }
      );
    }

    // Validate analysisType
    if (!VALID_ANALYSIS_TYPES.includes(analysisType)) {
      return NextResponse.json(
        { 
          error: `analysisType must be one of: ${VALID_ANALYSIS_TYPES.join(', ')}`, 
          code: 'INVALID_ANALYSIS_TYPE' 
        },
        { status: 400 }
      );
    }

    // Check if referenced code snippet exists
    const snippet = await db
      .select()
      .from(codeSnippet)
      .where(eq(codeSnippet.id, parsedSnippetId))
      .limit(1);

    if (snippet.length === 0) {
      return NextResponse.json(
        { error: 'Code snippet not found' },
        { status: 404 }
      );
    }

    // Create new analysis
    const newAnalysis = await db
      .insert(analysis)
      .values({
        snippetId: parsedSnippetId,
        analysisType: analysisType.trim(),
        prompt: prompt.trim(),
        response: response.trim(),
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newAnalysis[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
