'use client';

import { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import HistorySidebar from '@/components/HistorySidebar';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Bug, Lightbulb, Zap, BookOpen, Menu, X, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Analysis {
  id: number;
  analysisType: string;
  response: string;
  createdAt: string;
}

interface Snippet {
  id: number;
  code: string;
  language: string;
  createdAt: string;
  analyses: Analysis[];
}

export default function Home() {
  const [code, setCode] = useState('// Write or paste your code here\nfunction example() {\n  console.log("Hello, World!");\n}\n');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSnippetId, setCurrentSnippetId] = useState<number | null>(null);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refreshHistory, setRefreshHistory] = useState(0);
  const [error, setError] = useState('');

  const languages = [
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

  const handleAnalyze = async (type: 'analyze' | 'fix' | 'explain' | 'optimize') => {
    if (!code.trim()) {
      setError('Please enter some code first');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      // First, save or update the snippet
      let snippetId = currentSnippetId;
      
      if (!snippetId) {
        const snippetResponse = await fetch('/api/snippets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, language }),
        });

        if (!snippetResponse.ok) throw new Error('Failed to save snippet');
        
        const snippet = await snippetResponse.json();
        snippetId = snippet.id;
        setCurrentSnippetId(snippetId);
      }

      // Call Gemini API for analysis
      const geminiResponse = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, analysisType: type }),
      });

      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.json();
        throw new Error(errorData.error || 'Failed to analyze code');
      }

      const { response: aiResponse, prompt } = await geminiResponse.json();

      // Save the analysis
      const analysisResponse = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          snippetId,
          analysisType: type,
          prompt,
          response: aiResponse,
        }),
      });

      if (!analysisResponse.ok) throw new Error('Failed to save analysis');

      const newAnalysis = await analysisResponse.json();
      
      setOutput(aiResponse);
      setAnalyses(prev => [newAnalysis, ...prev]);
      setRefreshHistory(prev => prev + 1);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred while analyzing the code');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSnippet = (snippet: Snippet) => {
    setCode(snippet.code);
    setLanguage(snippet.language);
    setCurrentSnippetId(snippet.id);
    setAnalyses(snippet.analyses);
    setOutput(snippet.analyses[0]?.response || '');
    setSidebarOpen(false);
  };

  const handleNewSnippet = () => {
    setCode('// Write or paste your code here\n');
    setCurrentSnippetId(null);
    setAnalyses([]);
    setOutput('');
    setError('');
  };

  const getAnalysisTypeIcon = (type: string) => {
    switch (type) {
      case 'analyze': return <Sparkles className="w-4 h-4" />;
      case 'fix': return <Bug className="w-4 h-4" />;
      case 'explain': return <Lightbulb className="w-4 h-4" />;
      case 'optimize': return <Zap className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI Code Assistant
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/about">
              <Button variant="ghost" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                About
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 border-r bg-card absolute lg:relative z-10 h-full`}>
          <HistorySidebar onSelectSnippet={handleSelectSnippet} refreshTrigger={refreshHistory} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Controls */}
          <div className="border-b bg-card p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Separator orientation="vertical" className="h-6" />

              <Button
                variant="default"
                size="sm"
                onClick={() => handleAnalyze('analyze')}
                disabled={loading}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAnalyze('fix')}
                disabled={loading}
              >
                <Bug className="w-4 h-4 mr-2" />
                Fix
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAnalyze('explain')}
                disabled={loading}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Explain
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAnalyze('optimize')}
                disabled={loading}
              >
                <Zap className="w-4 h-4 mr-2" />
                Optimize
              </Button>

              <div className="flex-1" />

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNewSnippet}
              >
                New
              </Button>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="m-4 mb-0">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Editor and Output */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            {/* Code Editor */}
            <div className="border-r flex flex-col overflow-hidden">
              <div className="p-3 border-b bg-muted/30">
                <h3 className="text-sm font-medium">Code Editor</h3>
              </div>
              <div className="flex-1 overflow-hidden">
                <CodeEditor
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  language={language}
                />
              </div>
            </div>

            {/* Output Panel */}
            <div className="flex flex-col overflow-hidden">
              <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
                <h3 className="text-sm font-medium">AI Response</h3>
                {loading && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
              </div>
              <div className="flex-1 overflow-auto p-4">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Analyzing your code...</p>
                    </div>
                  </div>
                ) : output ? (
                  <div className="space-y-4">
                    <Card className="p-4">
                      <pre className="whitespace-pre-wrap text-sm font-mono">{output}</pre>
                    </Card>

                    {analyses.length > 1 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Previous Analyses</h4>
                        {analyses.slice(1).map((analysis) => (
                          <Card key={analysis.id} className="p-3 cursor-pointer hover:bg-accent/50" onClick={() => setOutput(analysis.response)}>
                            <div className="flex items-center gap-2 mb-2">
                              {getAnalysisTypeIcon(analysis.analysisType)}
                              <Badge variant="outline" className="text-xs">
                                {analysis.analysisType}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(analysis.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">{analysis.response}</p>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <Sparkles className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Select an action to analyze your code
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
