import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code, language } = await request.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: 'Code and language are required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    const prompt = `You are an expert code reviewer. Analyze the following ${language} code and provide a comprehensive review.

Code to analyze:
\`\`\`${language}
${code}
\`\`\`

Provide your analysis in the following JSON format (respond ONLY with valid JSON, no other text):
{
  "bugs": [
    {
      "line": <line_number_or_null>,
      "severity": "<Critical|High|Medium|Low>",
      "title": "<bug_title>",
      "description": "<short_description>",
      "explanation": "<detailed_explanation>"
    }
  ],
  "optimizations": [
    {
      "category": "<Performance|Code Quality|Best Practices|Readability>",
      "title": "<optimization_title>",
      "description": "<detailed_description>",
      "impact": "<High|Medium|Low>"
    }
  ],
  "optimizedCode": "<the_complete_optimized_version_of_the_code>",
  "timeComplexity": {
    "overall": "<overall_time_complexity>",
    "operations": [
      {
        "name": "<operation_name>",
        "complexity": "<complexity>",
        "explanation": "<explanation>"
      }
    ]
  },
  "spaceComplexity": {
    "overall": "<overall_space_complexity>",
    "explanation": "<detailed_explanation>"
  }
}

Important:
- If no bugs found, return empty array for bugs
- Provide at least 2-3 optimization suggestions
- Include complete optimized code with all improvements applied
- Be specific about time and space complexity
- Respond with ONLY valid JSON`;

    // Call Gemini API directly using REST API with v1 endpoint and gemini-2.5-flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to analyze code');
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    // Extract JSON from response (handle cases where model adds markdown formatting)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    const analysis = JSON.parse(jsonText);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('Error analyzing code:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze code' },
      { status: 500 }
    );
  }
}
