'use client';

import Link from 'next/link';
import { Sparkles, Code, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
          <Sparkles className="w-5 h-5" />
          <span>AI Code Assistant</span>
        </Link>
        
        <nav className="flex items-center gap-2">
          <Link href="/editor">
            <Button variant="ghost" size="sm">
              <Code className="w-4 h-4 mr-2" />
              Editor
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              About
            </Button>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

