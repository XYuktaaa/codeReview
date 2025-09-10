import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Sparkles, Code, Database, Zap, Globe, BookOpen, ArrowLeft, GitBranch, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Editor
            </Button>
          </Link>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Code Assistant
          </h1>
          <div className="w-24" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Code Editor with Integrated AI Assistant</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive full-stack web development project demonstrating modern AI integration,
            real-time code analysis, and intelligent developer tools
          </p>
        </div>

        {/* Project Overview */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Project Overview
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This application is a sophisticated code editor powered by Google Gemini Flash 2.5 AI that provides
            intelligent code analysis, debugging suggestions, optimization tips, and comprehensive code explanations.
            Built with modern full-stack technologies, it showcases practical real-world use of AI in developer tools.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The project demonstrates strong understanding of full-stack architecture, modern frameworks, error handling,
            AI-powered automation, and deployment workflows. It serves as both a functional tool for developers and
            a learning platform for understanding AI integration in web applications.
          </p>
        </Card>

        {/* Workflow Diagram - User Interaction Flow */}
        <Card className="p-8 mb-8 bg-muted/30">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <GitBranch className="w-6 h-6" />
            System Workflow & Architecture Diagrams
          </h2>
          
          {/* User Interaction Flow */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              1. User Interaction Flow
            </h3>
            <div className="bg-card p-6 rounded-lg border-2 border-border font-mono text-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded">User</div>
                <ArrowRight className="w-4 h-4" />
                <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded">Opens Application</div>
              </div>
              <div className="pl-4">↓</div>
              <div className="flex items-center gap-2 pl-4">
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded">Monaco Editor</div>
                <span className="text-muted-foreground">← Writes/Pastes Code</span>
              </div>
              <div className="pl-4">↓</div>
              <div className="flex items-center gap-2 pl-4">
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded">Select Language</div>
                <span className="text-muted-foreground">← JavaScript, Python, Java, etc.</span>
              </div>
              <div className="pl-4">↓</div>
              <div className="flex items-center gap-2 pl-4">
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded">Choose AI Action</div>
                <span className="text-muted-foreground">← Analyze / Fix / Explain / Optimize</span>
              </div>
              <div className="pl-4">↓</div>
              <div className="flex items-center gap-2 pl-4">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded">Frontend</div>
                <ArrowRight className="w-4 h-4" />
                <span className="text-muted-foreground">Sends POST Request</span>
                <ArrowRight className="w-4 h-4" />
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded">API</div>
              </div>
              <div className="pl-4">↓</div>
              <div className="flex items-center gap-2 pl-4">
                <div className="bg-destructive text-primary-foreground px-3 py-1 rounded">Loading State</div>
                <span className="text-muted-foreground">← Shows spinner while processing</span>
              </div>
              <div className="pl-4">↓</div>
              <div className="flex items-center gap-2 pl-4">
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded">AI Response</div>
                <ArrowRight className="w-4 h-4" />
                <span className="text-muted-foreground">Displayed in Output Panel</span>
              </div>
              <div className="pl-4">↓</div>
              <div className="flex items-center gap-2 pl-4">
                <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded">History Saved</div>
                <span className="text-muted-foreground">← Stored in database for future reference</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Explanation:</strong> Users write code in the Monaco Editor, select their programming language,
              and click one of four AI action buttons. The request is sent to the backend API, which processes it
              with the Gemini AI model. While waiting, a loading spinner provides feedback. Results are displayed
              in the output panel and saved to the database for history tracking.
            </p>
          </div>

          {/* Backend Processing Flow */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              2. Backend API Processing Flow
            </h3>
            <div className="bg-card p-6 rounded-lg border-2 border-border font-mono text-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded">POST /api/snippets</div>
                <span className="text-muted-foreground">← First request: Save code snippet</span>
              </div>
              <div className="pl-4">↓</div>
              <div className="pl-4 space-y-1">
                <div>• Validate request body (code, language)</div>
                <div>• Insert into snippets table</div>
                <div>• Return snippet ID</div>
              </div>
              <div className="pl-4">↓</div>
              <div className="flex items-center gap-2 pl-4">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded">POST /api/gemini</div>
                <span className="text-muted-foreground">← Second request: Analyze code</span>
              </div>
              <div className="pl-4">↓</div>
              <div className="pl-4 space-y-1">
                <div>• Validate request (code, language, analysisType)</div>
                <div>• Check GEMINI_API_KEY environment variable</div>
                <div>• Initialize GoogleGenerativeAI client</div>
                <div>• Build analysis prompt based on type:</div>
                <div className="pl-4">- analyze: Find errors, bugs, improvements</div>
                <div className="pl-4">- fix: Provide corrected code</div>
                <div className="pl-4">- explain: Break down code in simple terms</div>
                <div className="pl-4">- optimize: Improve performance & best practices</div>
                <div>• Call Gemini API with gemini-2.0-flash-exp model</div>
                <div>• Parse AI response text</div>
                <div>• Return {`{ response, prompt }`}</div>
              </div>
              <div className="pl-4">↓</div>
              <div className="flex items-center gap-2 pl-4">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded">POST /api/analysis</div>
                <span className="text-muted-foreground">← Third request: Save analysis</span>
              </div>
              <div className="pl-4">↓</div>
              <div className="pl-4 space-y-1">
                <div>• Validate request (snippetId, analysisType, prompt, response)</div>
                <div>• Insert into analyses table with foreign key</div>
                <div>• Return saved analysis object</div>
              </div>
              <div className="pl-4">↓</div>
              <div className="flex items-center gap-2 pl-4">
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded">Update UI</div>
                <span className="text-muted-foreground">← Frontend displays result</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Explanation:</strong> The backend follows a three-step process: (1) Save the code snippet to the database,
              (2) Send the code to Gemini API for AI analysis with a customized prompt based on the action type,
              (3) Save the AI response as an analysis record linked to the snippet. Each step includes validation and error handling.
            </p>
          </div>

          {/* Database Schema Flow */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              3. Database Schema & Relationships
            </h3>
            <div className="bg-card p-6 rounded-lg border-2 border-border font-mono text-xs space-y-3">
              <div>
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded inline-block mb-2">snippets Table</div>
                <div className="pl-4 space-y-1 text-muted-foreground">
                  <div>• id: INTEGER PRIMARY KEY AUTOINCREMENT</div>
                  <div>• code: TEXT NOT NULL</div>
                  <div>• language: TEXT NOT NULL</div>
                  <div>• created_at: TEXT DEFAULT CURRENT_TIMESTAMP</div>
                </div>
              </div>
              <div className="flex items-center gap-2 pl-8">
                <div>↓</div>
                <span className="text-muted-foreground">One-to-Many Relationship</span>
              </div>
              <div>
                <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded inline-block mb-2">analyses Table</div>
                <div className="pl-4 space-y-1 text-muted-foreground">
                  <div>• id: INTEGER PRIMARY KEY AUTOINCREMENT</div>
                  <div>• snippet_id: INTEGER FOREIGN KEY → snippets(id)</div>
                  <div>• analysis_type: TEXT NOT NULL</div>
                  <div>• prompt: TEXT NOT NULL</div>
                  <div>• response: TEXT NOT NULL</div>
                  <div>• created_at: TEXT DEFAULT CURRENT_TIMESTAMP</div>
                  <div>• CASCADE ON DELETE (deleting snippet removes all analyses)</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-muted-foreground">
                  <strong>Query Example - Load Snippet with History:</strong>
                  <div className="mt-2 bg-muted p-3 rounded">
                    SELECT * FROM snippets<br />
                    LEFT JOIN analyses ON snippets.id = analyses.snippet_id<br />
                    ORDER BY analyses.created_at DESC
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Explanation:</strong> The database uses a relational schema where each code snippet can have multiple analyses.
              The foreign key relationship ensures data integrity, and cascade delete prevents orphaned records. This design allows
              users to track all AI interactions for each piece of code they've analyzed.
            </p>
          </div>

          {/* AI Prompt Engineering Flow */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              4. AI Prompt Engineering Strategy
            </h3>
            <div className="bg-card p-6 rounded-lg border-2 border-border font-mono text-xs space-y-3">
              <div>
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded inline-block mb-2">Analyze Action</div>
                <div className="pl-4 mt-2 bg-muted p-2 rounded text-muted-foreground">
                  "Analyze this {`{language}`} code and identify any errors,<br />
                  bugs, potential issues, or improvements. Be specific<br />
                  and detailed:\n\n{`{code}`}"
                </div>
              </div>
              
              <div>
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded inline-block mb-2">Fix Action</div>
                <div className="pl-4 mt-2 bg-muted p-2 rounded text-muted-foreground">
                  "Fix all errors and bugs in this {`{language}`} code.<br />
                  Provide the complete corrected code with explanations<br />
                  of what was fixed:\n\n{`{code}`}"
                </div>
              </div>

              <div>
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded inline-block mb-2">Explain Action</div>
                <div className="pl-4 mt-2 bg-muted p-2 rounded text-muted-foreground">
                  "Explain this {`{language}`} code in simple terms.<br />
                  Break down what each part does and how it works:\n\n{`{code}`}"
                </div>
              </div>

              <div>
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded inline-block mb-2">Optimize Action</div>
                <div className="pl-4 mt-2 bg-muted p-2 rounded text-muted-foreground">
                  "Optimize this {`{language}`} code for better performance,<br />
                  readability, and best practices. Provide the optimized<br />
                  version with explanations:\n\n{`{code}`}"
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Explanation:</strong> Each AI action uses a carefully crafted prompt that includes the programming language
              for context-aware analysis and specific instructions for the desired output. The prompts are designed to produce
              actionable, detailed responses that provide maximum value to developers. Language context helps the AI understand
              syntax-specific requirements and conventions.
            </p>
          </div>

          {/* Deployment Architecture */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              5. Deployment Architecture
            </h3>
            <div className="bg-card p-6 rounded-lg border-2 border-border font-mono text-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded">Vercel Platform</div>
                <ArrowRight className="w-4 h-4" />
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded">Next.js App (Frontend + API)</div>
              </div>
              <div className="pl-4">↓ Environment Variables</div>
              <div className="pl-4 space-y-1 text-muted-foreground">
                <div>• GEMINI_API_KEY → Google Gemini API authentication</div>
                <div>• TURSO_CONNECTION_URL → Database connection string</div>
                <div>• TURSO_AUTH_TOKEN → Database authentication token</div>
              </div>
              <div className="pl-4">↓ Connects to</div>
              <div className="flex items-center gap-3 pl-4">
                <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded">Turso Edge Database</div>
                <span className="text-muted-foreground">← SQLite @ Edge Locations</span>
              </div>
              <div className="pl-4">↓ API Calls to</div>
              <div className="flex items-center gap-3 pl-4">
                <div className="bg-destructive text-primary-foreground px-3 py-1 rounded">Google Gemini API</div>
                <span className="text-muted-foreground">← AI Model: gemini-2.0-flash-exp</span>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div><strong>Deployment Flow:</strong></div>
                <div className="mt-2 space-y-1 text-muted-foreground">
                  <div>1. Code pushed to GitHub repository</div>
                  <div>2. Vercel detects changes via webhook</div>
                  <div>3. Automatic build process runs (bun install, next build)</div>
                  <div>4. Environment variables injected from Vercel dashboard</div>
                  <div>5. Static assets deployed to Vercel CDN</div>
                  <div>6. API routes deployed as serverless functions</div>
                  <div>7. Database migrations run automatically (Drizzle)</div>
                  <div>8. Application live at custom domain or vercel.app URL</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Explanation:</strong> The application is deployed on Vercel, which provides automatic deployments from GitHub,
              serverless function hosting for API routes, and global CDN for static assets. Turso database operates at the edge for
              low latency worldwide. Environment variables are securely managed through Vercel's dashboard, ensuring sensitive API keys
              are never committed to version control. The deployment process is fully automated with continuous integration/deployment (CI/CD).
            </p>
          </div>
        </Card>

        {/* Key Features */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-start gap-3 mb-3">
                <Code className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Interactive Code Editor</h3>
                  <p className="text-sm text-muted-foreground">
                    Monaco Editor integration with syntax highlighting for 10+ programming languages,
                    line numbers, and intelligent code formatting
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3 mb-3">
                <Sparkles className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time code analysis using Google Gemini Flash 2.5 for error detection,
                    debugging suggestions, and optimization recommendations
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3 mb-3">
                <Zap className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Multiple AI Actions</h3>
                  <p className="text-sm text-muted-foreground">
                    Analyze for bugs, automatically fix code, explain complex logic in simple terms,
                    and optimize for performance and best practices
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3 mb-3">
                <Database className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Persistent History</h3>
                  <p className="text-sm text-muted-foreground">
                    All code snippets and analyses are saved in a database, allowing you to
                    review past sessions and track your coding improvements
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3 mb-3">
                <Globe className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Modern UI/UX</h3>
                  <p className="text-sm text-muted-foreground">
                    Clean black and white interface with dark/light mode support, responsive design,
                    and intuitive navigation for seamless user experience
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3 mb-3">
                <BookOpen className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Code Explanations</h3>
                  <p className="text-sm text-muted-foreground">
                    Get detailed explanations of complex code in simple terms, perfect for learning
                    and understanding unfamiliar code patterns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Technology Stack */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-lg">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Next.js 15</Badge>
                <Badge variant="secondary">React 19</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">Shadcn/UI</Badge>
                <Badge variant="secondary">Monaco Editor</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Built with Next.js App Router for optimal performance, React Server Components for efficient rendering,
                and Monaco Editor (the same editor that powers VS Code) for a professional coding experience.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3 text-lg">Backend & Database</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Next.js API Routes</Badge>
                <Badge variant="secondary">Drizzle ORM</Badge>
                <Badge variant="secondary">Turso (SQLite)</Badge>
                <Badge variant="secondary">TypeScript</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                RESTful API architecture with Next.js API routes, Drizzle ORM for type-safe database queries,
                and Turso for a fast, distributed SQLite database with edge support.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3 text-lg">AI Integration</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Google Gemini Flash 2.5</Badge>
                <Badge variant="secondary">Prompt Engineering</Badge>
                <Badge variant="secondary">API Integration</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Integrated with Google Gemini Flash 2.5, one of the most advanced AI models available,
                using carefully crafted prompts to provide accurate code analysis, debugging, and optimization suggestions.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3 text-lg">Deployment</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Vercel</Badge>
                <Badge variant="secondary">Turso Edge Database</Badge>
                <Badge variant="secondary">Environment Variables</Badge>
                <Badge variant="secondary">CI/CD</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Deployed on Vercel for optimal performance and automatic deployments, with Turso edge database
                for low-latency global access and secure environment variable management for API keys.
              </p>
            </div>
          </div>
        </Card>

        {/* Architecture */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Full-Stack Architecture</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Frontend Layer</h3>
              <p className="text-sm text-muted-foreground">
                The user interface is built with React components and Next.js App Router, providing a responsive
                and intuitive experience. Monaco Editor handles code input with syntax highlighting, while custom
                components manage the AI interaction flow and display results.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">API Layer</h3>
              <p className="text-sm text-muted-foreground">
                Next.js API routes serve as the backend, handling request validation, database operations,
                and communication with the Gemini API. This layer includes endpoints for CRUD operations on
                code snippets and analyses, plus the AI integration endpoint.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Database Layer</h3>
              <p className="text-sm text-muted-foreground">
                Drizzle ORM provides type-safe database access to a Turso SQLite database. The schema includes
                tables for code snippets and analyses, with foreign key relationships ensuring data integrity
                and cascade deletes for cleanup.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">AI Integration</h3>
              <p className="text-sm text-muted-foreground">
                The Gemini API integration uses prompt engineering to transform user code and actions into
                effective AI prompts. Response parsing ensures the AI output is properly formatted and displayed
                to users, with error handling for robust operation.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Learning Outcomes</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Technical Skills</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Full-stack web development with Next.js</li>
                <li>AI API integration and prompt engineering</li>
                <li>Database design and ORM implementation</li>
                <li>RESTful API design and implementation</li>
                <li>Type-safe development with TypeScript</li>
                <li>Modern UI/UX design principles</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Professional Skills</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Project architecture and planning</li>
                <li>Error handling and validation</li>
                <li>Deployment and DevOps practices</li>
                <li>Environment variable management</li>
                <li>Code organization and best practices</li>
                <li>Documentation and communication</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Project Information */}
        <Card className="p-8 mb-8 bg-muted/50">
          <h2 className="text-2xl font-bold mb-4">Project Information</h2>
          
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Developer:</span>{' '}
              <span className="text-muted-foreground">Yukta</span>
            </div>
            <div>
              <span className="font-semibold">Course:</span>{' '}
              <span className="text-muted-foreground">[Course Name] - Full-Stack Web Development</span>
            </div>
            <div>
              <span className="font-semibold">Institution:</span>{' '}
              <span className="text-muted-foreground">[University/Institute Name]</span>
            </div>
            <div>
              <span className="font-semibold">Project Goal:</span>{' '}
              <span className="text-muted-foreground">
                Learn full-stack development, AI integration, prompt engineering, UI/UX design, and deployment workflows
                through building a practical, real-world application
              </span>
            </div>
          </div>
        </Card>

        {/* Use Cases */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Real-World Use Cases</h2>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold mb-1">For Students</h3>
              <p className="text-sm text-muted-foreground">
                Understand complex code examples from textbooks or online resources, get instant explanations
                of unfamiliar syntax, and learn best practices through AI-generated optimization suggestions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">For Developers</h3>
              <p className="text-sm text-muted-foreground">
                Quickly debug problematic code, get second opinions on implementation approaches, optimize
                performance-critical sections, and ensure code follows current best practices.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">For Code Review</h3>
              <p className="text-sm text-muted-foreground">
                Identify potential issues before submitting pull requests, get suggestions for code improvements,
                and maintain a history of code iterations and improvements.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">For Learning</h3>
              <p className="text-sm text-muted-foreground">
                Explore different programming languages with AI-assisted learning, understand the reasoning behind
                code patterns, and build better coding habits through consistent feedback.
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 text-sm text-muted-foreground">
          <p>Built with ❤️ by Yukta as part of [Course Name] at [University/Institute Name]</p>
          <p className="mt-2">
            Demonstrating modern full-stack development, AI integration, and professional deployment practices
          </p>
        </div>
      </main>
    </div>
  );
}
