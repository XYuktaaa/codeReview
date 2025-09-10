export async function POST(request: Request) {
  try {
    const { code, language, analysisType } = await request.json();

    if (!code || !language || !analysisType) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Build prompt based on analysis type
    let systemPrompt = 'You are an expert code analyzer and assistant.';
    let userPrompt = '';
    
    switch (analysisType) {
      case 'analyze':
        userPrompt = `Analyze the following ${language} code for errors, potential bugs, and improvements:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\nProvide a detailed analysis.`;
        break;
      case 'fix':
        userPrompt = `Find and fix any errors or bugs in the following ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\nProvide the corrected code and explain what was fixed.`;
        break;
      case 'explain':
        userPrompt = `Explain the following ${language} code in simple terms:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\nBreak down what each part does.`;
        break;
      case 'optimize':
        userPrompt = `Optimize the following ${language} code for better performance and readability:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\nProvide the optimized version and explain the improvements.`;
        break;
      default:
        userPrompt = `Analyze the following ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``;
    }

    // Call Hugging Face Router API (OpenAI-compatible)
    const hfResponse = await fetch(
      'https://router.huggingface.co/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-3.1-8B-Instruct',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
        }),
      }
    );

    if (!hfResponse.ok) {
      const errorData = await hfResponse.text();
      throw new Error(`Hugging Face API error: ${errorData}`);
    }

    const result = await hfResponse.json();
    const response = result.choices[0].message.content;

    return Response.json({
      response,
      prompt: userPrompt,
    });
  } catch (error: any) {
    console.error('Hugging Face API Error:', error);
    return Response.json(
      { error: `Failed to analyze code: ${error.message}` },
      { status: 500 }
    );
  }
}
