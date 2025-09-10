"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Zap, 
  Code, 
  TrendingUp,
  Clock,
  Database
} from 'lucide-react';
import Editor from '@monaco-editor/react';

interface Bug {
  line: number | null;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  explanation: string;
}

interface Optimization {
  category: 'Performance' | 'Code Quality' | 'Best Practices' | 'Readability';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

interface TimeComplexityOperation {
  name: string;
  complexity: string;
  explanation: string;
}

interface AnalysisResult {
  bugs: Bug[];
  optimizations: Optimization[];
  optimizedCode: string;
  timeComplexity: {
    overall: string;
    operations: TimeComplexityOperation[];
  };
  spaceComplexity: {
    overall: string;
    explanation: string;
  };
}

interface ResultsDisplayProps {
  results: AnalysisResult | null;
  language: string;
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    case 'High':
      return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    case 'Medium':
      return <Info className="h-5 w-5 text-yellow-500" />;
    case 'Low':
      return <CheckCircle className="h-5 w-5 text-blue-500" />;
    default:
      return <Info className="h-5 w-5" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'destructive';
    case 'High':
      return 'default';
    case 'Medium':
      return 'secondary';
    case 'Low':
      return 'outline';
    default:
      return 'default';
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'High':
      return 'default';
    case 'Medium':
      return 'secondary';
    case 'Low':
      return 'outline';
    default:
      return 'default';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Performance':
      return <Zap className="h-4 w-4" />;
    case 'Code Quality':
      return <Code className="h-4 w-4" />;
    case 'Best Practices':
      return <CheckCircle className="h-4 w-4" />;
    case 'Readability':
      return <TrendingUp className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

export default function ResultsDisplay({ results, language }: ResultsDisplayProps) {
  if (!results) {
    return (
      <Card className="w-full border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Code className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Paste your code and click "Analyze Code" to see results
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="bugs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="bugs" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Bugs ({results.bugs.length})
          </TabsTrigger>
          <TabsTrigger value="optimizations" className="gap-2">
            <Zap className="h-4 w-4" />
            Optimizations
          </TabsTrigger>
          <TabsTrigger value="optimized" className="gap-2">
            <Code className="h-4 w-4" />
            Optimized Code
          </TabsTrigger>
          <TabsTrigger value="complexity" className="gap-2">
            <Clock className="h-4 w-4" />
            Complexity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bugs" className="space-y-4 mt-6">
          {results.bugs.length === 0 ? (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>No Bugs Found!</AlertTitle>
              <AlertDescription>
                Great job! The code appears to be bug-free.
              </AlertDescription>
            </Alert>
          ) : (
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {results.bugs.map((bug, index) => (
                  <Card key={index} className="border-l-4" style={{
                    borderLeftColor: bug.severity === 'Critical' ? 'hsl(var(--destructive))' :
                                    bug.severity === 'High' ? '#f97316' :
                                    bug.severity === 'Medium' ? '#eab308' : '#3b82f6'
                  }}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          {getSeverityIcon(bug.severity)}
                          <div className="space-y-1 flex-1">
                            <CardTitle className="text-base">{bug.title}</CardTitle>
                            {bug.line && (
                              <p className="text-sm text-muted-foreground">Line {bug.line}</p>
                            )}
                          </div>
                        </div>
                        <Badge variant={getSeverityColor(bug.severity) as any}>
                          {bug.severity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Description:</p>
                        <p className="text-sm text-muted-foreground">{bug.description}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Why it occurs:</p>
                        <p className="text-sm text-muted-foreground">{bug.explanation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="optimizations" className="space-y-4 mt-6">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {results.optimizations.map((opt, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        {getCategoryIcon(opt.category)}
                        <div className="space-y-1 flex-1">
                          <CardTitle className="text-base">{opt.title}</CardTitle>
                          <CardDescription>{opt.category}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={getImpactColor(opt.impact) as any}>
                        {opt.impact} Impact
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{opt.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="optimized" className="mt-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base">Optimized Version</CardTitle>
              <CardDescription>
                Improved code with applied optimizations and bug fixes
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px]">
                <Editor
                  height="100%"
                  language={language}
                  value={results.optimizedCode}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complexity" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle>Time Complexity</CardTitle>
                </div>
                <CardDescription>Overall: {results.timeComplexity.overall}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    {results.timeComplexity.operations.map((op, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{op.name}</p>
                          <Badge variant="secondary">{op.complexity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{op.explanation}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  <CardTitle>Space Complexity</CardTitle>
                </div>
                <CardDescription>Overall: {results.spaceComplexity.overall}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {results.spaceComplexity.explanation}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

