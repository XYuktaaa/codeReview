import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { codeSnippet, analysis } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const snippetId = parseInt(id);

    // Query snippet by ID
    const snippetResult = await db
      .select()
      .from(codeSnippet)
      .where(eq(codeSnippet.id, snippetId))
      .limit(1);

    if (snippetResult.length === 0) {
      return NextResponse.json(
        { error: 'Code snippet not found' },
        { status: 404 }
      );
    }

    // Query all analyses for this snippet
    const analysesResult = await db
      .select()
      .from(analysis)
      .where(eq(analysis.snippetId, snippetId));

    // Combine snippet with analyses
    const snippet = {
      ...snippetResult[0],
      analyses: analysesResult
    };

    return NextResponse.json(snippet, { status: 200 });
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const snippetId = parseInt(id);

    // Check if snippet exists
    const existingSnippet = await db
      .select()
      .from(codeSnippet)
      .where(eq(codeSnippet.id, snippetId))
      .limit(1);

    if (existingSnippet.length === 0) {
      return NextResponse.json(
        { error: 'Code snippet not found' },
        { status: 404 }
      );
    }

    // Delete snippet (analyses will cascade delete automatically)
    await db
      .delete(codeSnippet)
      .where(eq(codeSnippet.id, snippetId));

    return NextResponse.json(
      {
        message: 'Code snippet deleted successfully',
        id: snippetId
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
