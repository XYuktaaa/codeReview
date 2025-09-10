'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Clock, Code } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Snippet {
  id: number;
  code: string;
  language: string;
  createdAt: string;
  analyses: Array<{
    id: number;
    analysisType: string;
    response: string;
    createdAt: string;
  }>;
}

interface HistorySidebarProps {
  onSelectSnippet: (snippet: Snippet) => void;
  refreshTrigger?: number;
}

export default function HistorySidebar({ onSelectSnippet, refreshTrigger }: HistorySidebarProps) {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/snippets');
      if (response.ok) {
        const data = await response.json();
        setSnippets(data);
      }
    } catch (error) {
      console.error('Failed to fetch snippets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, [refreshTrigger]);

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this snippet and all its analyses?')) return;

    try {
      const response = await fetch(`/api/snippets/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSnippets(snippets.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete snippet:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          History
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          {snippets.length} snippet{snippets.length !== 1 ? 's' : ''}
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {snippets.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-8">
              No code snippets yet. Start by analyzing some code!
            </div>
          ) : (
            snippets.map((snippet) => (
              <Card
                key={snippet.id}
                className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => onSelectSnippet(snippet)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Code className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-xs font-medium">{snippet.language}</span>
                    </div>
                    <pre className="text-xs text-muted-foreground line-clamp-2 font-mono whitespace-pre-wrap break-all">
                      {snippet.code}
                    </pre>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(snippet.createdAt)}
                      </span>
                      {snippet.analyses.length > 0 && (
                        <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                          {snippet.analyses.length} analysis
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 flex-shrink-0"
                    onClick={(e) => handleDelete(snippet.id, e)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

