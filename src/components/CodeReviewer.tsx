"use client";

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Loader2, Code2, Play } from 'lucide-react';

interface CodeReviewerProps {
  onAnalyze: (code: string, language: string) => void;
  isLoading: boolean;
}

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
];

const EXAMPLE_CODE = {
  javascript: `function findDuplicate(arr) {
  var duplicates = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

const numbers = [1, 2, 3, 2, 4, 5, 3];
console.log(findDuplicate(numbers));`,
  python: `def calculate_factorial(n):
    if n == 0:
        return 1
    result = 1
    for i in range(1, n + 1):
        result = result * i
    return result

print(calculate_factorial(5))`,
};

export default function CodeReviewer({ onAnalyze, isLoading }: CodeReviewerProps) {
  const [code, setCode] = useState(EXAMPLE_CODE.javascript);
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState<'light' | 'vs-dark'>('vs-dark');

  const handleAnalyze = () => {
    if (code.trim()) {
      onAnalyze(code, language);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // Load example code if available
    if (EXAMPLE_CODE[newLanguage as keyof typeof EXAMPLE_CODE]) {
      setCode(EXAMPLE_CODE[newLanguage as keyof typeof EXAMPLE_CODE]);
    }
  };

  return (
    <Card className="w-full overflow-hidden border-border/50 bg-card shadow-lg">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/50 bg-muted/30">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Code Editor</h2>
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleAnalyze}
            disabled={isLoading || !code.trim()}
            className="w-full sm:w-auto"
            size="default"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Analyze Code
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="h-[400px] w-full overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme={theme}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
          }}
        />
      </div>
    </Card>
  );
}
