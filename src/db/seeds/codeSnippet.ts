import { db } from '@/db';
import { codeSnippet, analysis } from '@/db/schema';

async function main() {
    const sampleSnippets = [
        {
            code: "function calculateSum(a, b) {\n  const sum = a + b;\n  // Missing return statement\n}",
            language: "javascript",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            code: "def find_duplicates(list1, list2):\n    duplicates = []\n    for item1 in list1:\n        for item2 in list2:\n            if item1 == item2:\n                duplicates.append(item1)\n    return duplicates",
            language: "python",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            code: "import React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}\n\nexport default Counter;",
            language: "javascript",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(codeSnippet).values(sampleSnippets);

    const sampleAnalyses = [
        {
            snippetId: 1,
            analysisType: "analyze",
            prompt: "What's wrong with this function?",
            response: "This function is missing a return statement. The sum is calculated but never returned to the caller.",
            createdAt: new Date().toISOString(),
        },
        {
            snippetId: 1,
            analysisType: "fix",
            prompt: "Fix this function",
            response: "function calculateSum(a, b) {\n  const sum = a + b;\n  return sum; // Added return statement\n}",
            createdAt: new Date().toISOString(),
        },
        {
            snippetId: 2,
            analysisType: "analyze",
            prompt: "Can this be optimized?",
            response: "Yes, this code uses nested loops with O(n*m) complexity. It can be optimized using a set for O(n+m) complexity.",
            createdAt: new Date().toISOString(),
        },
        {
            snippetId: 2,
            analysisType: "optimize",
            prompt: "Optimize this code",
            response: "def find_duplicates(list1, list2):\n    set2 = set(list2)\n    duplicates = [item for item in list1 if item in set2]\n    return duplicates",
            createdAt: new Date().toISOString(),
        },
        {
            snippetId: 3,
            analysisType: "explain",
            prompt: "Explain this component",
            response: "This is a React functional component that uses the useState hook to manage a counter state. It displays the current count and provides a button to increment it.",
            createdAt: new Date().toISOString(),
        }
    ];

    await db.insert(analysis).values(sampleAnalyses);
    
    console.log('✅ Code snippets and analyses seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
