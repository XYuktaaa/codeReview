import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, language, analysisType } = body;

    // Validate required fields
    if (!code || !language || !analysisType) {
      return NextResponse.json(
        { error: 'Code, language, and analysisType are required' },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Initialize Gemini AI - try gemini-2.0-flash for potentially different quota
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Create prompts based on analysis type
    let prompt = '';
    switch (analysisType) {
      case 'analyze':
        prompt = `Analyze this ${language} code and identify any errors, bugs, potential issues, or improvements. Be specific and detailed:\n\n${code}`;
        break;
      case 'fix':
        prompt = `Fix all errors and bugs in this ${language} code. Provide the complete corrected code with explanations of what was fixed:\n\n${code}`;
        break;
      case 'explain':
        prompt = `Explain this ${language} code in simple terms. Break down what each part does and how it works:\n\n${code}`;
        break;
      case 'optimize':
        prompt = `Optimize this ${language} code for better performance, readability, and best practices. Provide the optimized version with explanations:\n\n${code}`;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid analysis type' },
          { status: 400 }
        );
    }

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ 
      response: text,
      prompt 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze code: ' + error.message },
      { status: 500 }
    );
  }
}
