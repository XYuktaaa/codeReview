import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Direct REST API call to list models
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API returned ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json({ 
      models: data.models?.map((m: any) => ({
        name: m.name,
        displayName: m.displayName,
        description: m.description,
        supportedGenerationMethods: m.supportedGenerationMethods
      })) || []
    }, { status: 200 });
  } catch (error: any) {
    console.error('List models error:', error);
    return NextResponse.json(
      { error: 'Failed to list models: ' + error.message },
      { status: 500 }
    );
  }
}
