# Developer Documentation - AI Code Analysis Platform

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Core Components](#core-components)
6. [API Routes](#api-routes)
7. [Database Schema](#database-schema)
8. [Key Features & Functions](#key-features--functions)
9. [Data Flow](#data-flow)
10. [Setup & Installation](#setup--installation)
11. [Environment Variables](#environment-variables)
12. [Deployment](#deployment)
13. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**AI Code Analysis Platform** is a full-stack web application that provides intelligent code analysis using AI. Built with Next.js 15, it features a Monaco-based code editor integrated with Hugging Face's Meta Llama 3.1 model for real-time code analysis, bug detection, optimization suggestions, and explanations.

### Key Capabilities

- **Code Analysis**: Detect errors, bugs, and potential improvements
- **Bug Fixing**: Automatically identify and suggest fixes for code issues
- **Code Explanation**: Break down complex code into simple explanations
- **Optimization**: Suggest performance and readability improvements
- **History Management**: Store and retrieve past code snippets and analyses
- **Multi-Language Support**: Supports 10+ programming languages

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Homepage   │  │    Editor    │  │    About     │      │
│  │   (Landing)  │  │   (Main UI)  │  │    (Docs)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                   │             │
│         └──────────────────┼───────────────────┘             │
│                            │                                 │
│                  ┌─────────▼──────────┐                     │
│                  │   Navbar Component  │                     │
│                  └────────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS
                            │
┌─────────────────────────────────────────────────────────────┐
│                    Next.js API Routes                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │
│  │  /snippets │  │ /analysis  │  │     /gemini        │   │
│  │  (CRUD)    │  │  (Save)    │  │  (AI Analysis)     │   │
│  └────────────┘  └────────────┘  └────────────────────┘   │
│        │              │                      │               │
└────────┼──────────────┼──────────────────────┼──────────────┘
         │              │                      │
         │              │                      │
┌────────▼──────────────▼──────────┐  ┌───────▼────────────┐
│     Turso Database (SQLite)      │  │  Hugging Face API  │
│  ┌──────────┐  ┌──────────────┐ │  │  Meta Llama 3.1    │
│  │ Snippets │  │   Analysis   │ │  │   8B Instruct      │
│  └──────────┘  └──────────────┘ │  └────────────────────┘
└──────────────────────────────────┘
```

### Request Flow

```
User Types Code → Monaco Editor → React State
                                      │
                                      ▼
                  User Clicks "Analyze" Button
                                      │
                                      ▼
                  ┌───────────────────────────────┐
                  │ 1. POST /api/snippets         │
                  │    Save code to database      │
                  │    Returns snippetId          │
                  └───────────────────────────────┘
                                      │
                                      ▼
                  ┌───────────────────────────────┐
                  │ 2. POST /api/gemini           │
                  │    Send code + language + type│
                  │    Build AI prompt            │
                  │    Call Hugging Face API      │
                  │    Return AI response         │
                  └───────────────────────────────┘
                                      │
                                      ▼
                  ┌───────────────────────────────┐
                  │ 3. POST /api/analysis         │
                  │    Save AI response to DB     │
                  │    Link to snippetId          │
                  │    Return analysis record     │
                  └───────────────────────────────┘
                                      │
                                      ▼
                  ┌───────────────────────────────┐
                  │ 4. Update UI                  │
                  │    Display formatted response │
                  │    Update history sidebar     │
                  │    Show previous analyses     │
                  └───────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.1.4 | React framework with App Router |
| **React** | 19.x | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **shadcn/ui** | Latest | Pre-built UI components |
| **Monaco Editor** | 0.52.2 | VSCode-based code editor |
| **React Markdown** | 10.1.0 | Markdown rendering |
| **Lucide Icons** | Latest | Icon library |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js API Routes** | 15.1.4 | Serverless API endpoints |
| **Drizzle ORM** | 0.39.3 | Type-safe database ORM |
| **Turso (libSQL)** | Latest | Serverless SQLite database |
| **Hugging Face API** | - | AI model inference |

### Development Tools

- **Bun** - Fast JavaScript runtime and package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## 📁 Project Structure

```
code-review-ai/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Homepage (Landing page)
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   ├── editor/
│   │   │   └── page.tsx              # Editor page (Main app)
│   │   ├── about/
│   │   │   └── page.tsx              # Documentation page
│   │   └── api/                      # API Routes
│   │       ├── snippets/
│   │       │   ├── route.ts          # POST, GET snippets
│   │       │   └── [id]/
│   │       │       └── route.ts      # DELETE snippet by ID
│   │       ├── analysis/
│   │       │   └── route.ts          # POST analysis
│   │       └── gemini/
│   │           └── route.ts          # POST AI analysis request
│   │
│   ├── components/                   # React Components
│   │   ├── Navbar.tsx                # Navigation bar
│   │   ├── CodeEditor.tsx            # Monaco editor wrapper
│   │   ├── HistorySidebar.tsx        # Code history display
│   │   ├── MarkdownRenderer.tsx      # AI response renderer
│   │   └── ui/                       # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── select.tsx
│   │       └── ...
│   │
│   ├── db/                           # Database
│   │   ├── index.ts                  # Database connection
│   │   ├── schema.ts                 # Drizzle schema definitions
│   │   └── seeds/                    # Seed data
│   │
│   └── lib/                          # Utilities
│       └── utils.ts                  # Helper functions
│
├── drizzle/                          # Database migrations
├── public/                           # Static assets
├── .env                              # Environment variables
├── drizzle.config.ts                 # Drizzle configuration
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
└── README.md                         # Project README
```

---

## 🧩 Core Components

### 1. **EditorPage** (`src/app/editor/page.tsx`)

**Purpose**: Main application interface combining code editor, AI controls, and output display.

**Key State Variables**:

```typescript
const [code, setCode] = useState<string>('')           // Current code in editor
const [language, setLanguage] = useState<string>('')   // Selected language
const [output, setOutput] = useState<string>('')       // AI response
const [loading, setLoading] = useState<boolean>(false) // API loading state
const [currentSnippetId, setCurrentSnippetId] = useState<number | null>(null)
const [analyses, setAnalyses] = useState<Analysis[]>([]) // Analysis history
const [sidebarOpen, setSidebarOpen] = useState<boolean>(false) // Mobile sidebar
const [error, setError] = useState<string>('')         // Error messages
```

**Key Functions**:

- **`handleAnalyze(type)`**: Orchestrates the entire analysis workflow
  1. Validates code input
  2. Saves/updates snippet in database
  3. Calls AI API with appropriate prompt
  4. Saves analysis result
  5. Updates UI state

- **`handleSelectSnippet(snippet)`**: Loads saved snippet into editor
- **`handleNewSnippet()`**: Resets editor to blank state
- **`getAnalysisTypeIcon(type)`**: Maps analysis type to icon component

**Component Structure**:

```tsx
<div className="h-screen flex flex-col">
  <Navbar />
  <div className="flex-1 flex overflow-hidden">
    <HistorySidebar />          {/* Left sidebar */}
    <main>
      <div>                      {/* Control bar */}
        <LanguageSelect />
        <AnalyzeButtons />
      </div>
      <div className="grid grid-cols-2">
        <CodeEditor />           {/* Left panel */}
        <OutputPanel />          {/* Right panel */}
      </div>
    </main>
  </div>
</div>
```

---

### 2. **CodeEditor** (`src/components/CodeEditor.tsx`)

**Purpose**: Wrapper around Monaco Editor for code input.

**Props**:

```typescript
interface CodeEditorProps {
  value: string;              // Code content
  onChange: (value: string | undefined) => void;
  language: string;           // Programming language
  readOnly?: boolean;         // Optional read-only mode
}
```

**Features**:

- Syntax highlighting for 10+ languages
- Auto-detects theme (light/dark) from `next-themes`
- Configurable editor options:
  - Line numbers enabled
  - Word wrap enabled
  - Minimap disabled for cleaner UI
  - Auto-layout adjustment

**Monaco Configuration**:

```typescript
options={{
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  wordWrap: 'on',
  readOnly,
  padding: { top: 16, bottom: 16 },
}}
```

---

### 3. **HistorySidebar** (`src/components/HistorySidebar.tsx`)

**Purpose**: Displays saved code snippets with analysis counts.

**Props**:

```typescript
interface HistorySidebarProps {
  onSelectSnippet: (snippet: Snippet) => void;
  refreshTrigger?: number;    // Triggers re-fetch when changed
}
```

**Key Functions**:

- **`fetchSnippets()`**: Fetches all snippets from API
- **`handleDelete(id)`**: Deletes snippet with confirmation
- **`formatDate(dateString)`**: Converts timestamp to relative time (e.g., "2h ago")

**Data Structure**:

```typescript
interface Snippet {
  id: number;
  code: string;
  language: string;
  createdAt: string;
  analyses: Analysis[];
}
```

**UI Features**:

- Scrollable list of snippets
- Shows code preview (truncated)
- Analysis count badge
- Relative timestamps
- Delete button with confirmation

---

### 4. **MarkdownRenderer** (`src/components/MarkdownRenderer.tsx`)

**Purpose**: Renders AI responses with proper markdown formatting.

**Features**:

- **Markdown Support**: Headings, lists, links, tables, blockquotes
- **Code Syntax Highlighting**: Uses `highlight.js` for code blocks
- **GitHub-style Rendering**: Uses `remark-gfm` for GitHub Flavored Markdown
- **Custom Styling**: Tailwind classes for consistent design

**Plugins Used**:

```typescript
remarkPlugins={[remarkGfm]}          // GitHub Flavored Markdown
rehypePlugins={[rehypeHighlight, rehypeRaw]}  // Syntax highlighting + raw HTML
```

**Custom Component Mapping**:

```typescript
components={{
  h1: ({ ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
  h2: ({ ...props }) => <h2 className="text-2xl font-semibold mb-3" {...props} />,
  code: ({ inline, ...props }) => inline 
    ? <code className="bg-muted px-1.5 py-0.5 rounded" {...props} />
    : <code className="block bg-card border rounded p-4" {...props} />,
  // ... more customizations
}}
```

---

### 5. **Navbar** (`src/components/Navbar.tsx`)

**Purpose**: Global navigation across all pages.

**Features**:

- Logo/brand link to homepage
- Navigation links (Editor, About)
- Theme toggle (light/dark mode)
- Responsive mobile menu
- Consistent across all routes

---

## 🔌 API Routes

### 1. **POST /api/snippets** - Create Code Snippet

**Purpose**: Save new code snippet to database.

**Request Body**:

```typescript
{
  code: string;      // Code content
  language: string;  // Programming language
}
```

**Response**:

```typescript
{
  id: number;
  code: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}
```

**Validation**:

- Code cannot be empty
- Language is required
- Inputs are trimmed and sanitized

**Error Codes**:

- `MISSING_CODE`: Code field is missing
- `EMPTY_CODE`: Code field is empty string
- `MISSING_LANGUAGE`: Language field is missing

---

### 2. **GET /api/snippets** - Fetch All Snippets

**Purpose**: Retrieve code snippets with their analyses.

**Query Parameters**:

```typescript
?limit=10       // Max results (default: 10, max: 100)
?offset=0       // Pagination offset (default: 0)
?search=term    // Search in code or language
```

**Response**:

```typescript
[
  {
    id: number;
    code: string;
    language: string;
    createdAt: string;
    updatedAt: string;
    analyses: [
      {
        id: number;
        snippetId: number;
        analysisType: string;
        prompt: string;
        response: string;
        createdAt: string;
      }
    ]
  }
]
```

**Features**:

- Pagination support
- Search filtering (LIKE query on code/language)
- Ordered by most recent first
- Includes all related analyses for each snippet

---

### 3. **DELETE /api/snippets/[id]** - Delete Snippet

**Purpose**: Delete snippet and all associated analyses.

**Path Parameter**: `id` (snippet ID)

**Response**: `204 No Content` on success

**Cascade Behavior**: Automatically deletes all analyses due to foreign key constraint.

---

### 4. **POST /api/gemini** - AI Code Analysis

**Purpose**: Send code to Hugging Face AI for analysis.

**Request Body**:

```typescript
{
  code: string;
  language: string;
  analysisType: 'analyze' | 'fix' | 'explain' | 'optimize';
}
```

**Response**:

```typescript
{
  response: string;  // AI-generated analysis
  prompt: string;    // Prompt sent to AI
}
```

**Analysis Types & Prompts**:

1. **analyze**: 
   ```
   Analyze the following {language} code for errors, potential bugs, 
   and improvements. Provide a detailed analysis.
   ```

2. **fix**: 
   ```
   Find and fix any errors or bugs in the following {language} code. 
   Provide the corrected code and explain what was fixed.
   ```

3. **explain**: 
   ```
   Explain the following {language} code in simple terms. 
   Break down what each part does.
   ```

4. **optimize**: 
   ```
   Optimize the following {language} code for better performance 
   and readability. Provide the optimized version and explain the improvements.
   ```

**AI Model Configuration**:

```typescript
{
  model: 'meta-llama/Llama-3.1-8B-Instruct',
  max_tokens: 1000,
  temperature: 0.7,    // Balance creativity and accuracy
  top_p: 0.95,         // Nucleus sampling
}
```

**Error Handling**:

- Validates all required fields
- Catches API errors from Hugging Face
- Returns descriptive error messages

---

### 5. **POST /api/analysis** - Save Analysis Result

**Purpose**: Store AI analysis result in database.

**Request Body**:

```typescript
{
  snippetId: number;
  analysisType: 'analyze' | 'fix' | 'explain' | 'optimize';
  prompt: string;
  response: string;
}
```

**Response**:

```typescript
{
  id: number;
  snippetId: number;
  analysisType: string;
  prompt: string;
  response: string;
  createdAt: string;
}
```

**Validation**:

- All fields are required
- `snippetId` must be valid integer
- `analysisType` must be one of the 4 valid types
- Referenced snippet must exist in database

**Error Codes**:

- `MISSING_SNIPPET_ID`: snippetId is missing
- `INVALID_SNIPPET_ID`: snippetId is not a valid integer
- `MISSING_ANALYSIS_TYPE`: analysisType is missing
- `INVALID_ANALYSIS_TYPE`: analysisType not in allowed list
- `404`: Referenced snippet does not exist

---

## 🗄️ Database Schema

**Database**: Turso (serverless SQLite)  
**ORM**: Drizzle

### Tables

#### **code_snippet**

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT |
| `code` | TEXT | NOT NULL |
| `language` | TEXT | NOT NULL |
| `created_at` | TEXT | NOT NULL (ISO 8601 string) |
| `updated_at` | TEXT | NOT NULL (ISO 8601 string) |

**Purpose**: Stores user code snippets.

---

#### **analysis**

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT |
| `snippet_id` | INTEGER | NOT NULL, FOREIGN KEY → code_snippet.id |
| `analysis_type` | TEXT | NOT NULL ('analyze', 'fix', 'explain', 'optimize') |
| `prompt` | TEXT | NOT NULL |
| `response` | TEXT | NOT NULL |
| `created_at` | TEXT | NOT NULL (ISO 8601 string) |

**Purpose**: Stores AI analysis results.

**Relationship**: 
- One snippet can have many analyses (One-to-Many)
- Foreign key with `ON DELETE CASCADE`

---

### Entity Relationship Diagram

```
┌─────────────────────────┐
│     code_snippet        │
├─────────────────────────┤
│ id (PK)                 │
│ code                    │
│ language                │
│ created_at              │
│ updated_at              │
└───────────┬─────────────┘
            │
            │ 1:N
            │
┌───────────▼─────────────┐
│       analysis          │
├─────────────────────────┤
│ id (PK)                 │
│ snippet_id (FK)         │
│ analysis_type           │
│ prompt                  │
│ response                │
│ created_at              │
└─────────────────────────┘
```

---

### Schema Definition (`src/db/schema.ts`)

```typescript
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const codeSnippet = sqliteTable('code_snippet', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  code: text('code').notNull(),
  language: text('language').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const analysis = sqliteTable('analysis', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  snippetId: integer('snippet_id')
    .notNull()
    .references(() => codeSnippet.id, { onDelete: 'cascade' }),
  analysisType: text('analysis_type').notNull(),
  prompt: text('prompt').notNull(),
  response: text('response').notNull(),
  createdAt: text('created_at').notNull(),
});
```

---

## 🔄 Data Flow

### Complete Analysis Workflow

```
1. USER ACTION
   └─ User types code in Monaco Editor
   └─ User selects language from dropdown
   └─ User clicks "Analyze" button

2. FRONTEND VALIDATION
   └─ Check if code is not empty
   └─ Set loading state to true
   └─ Clear previous errors

3. SAVE SNIPPET
   └─ Check if currentSnippetId exists
   └─ If NO: POST /api/snippets
      └─ Validate code and language
      └─ Insert into code_snippet table
      └─ Return new snippet with ID
      └─ Store snippetId in component state
   └─ If YES: Reuse existing snippetId

4. AI ANALYSIS
   └─ POST /api/gemini
      └─ Build prompt based on analysisType
      └─ Call Hugging Face Router API
         └─ Model: meta-llama/Llama-3.1-8B-Instruct
         └─ Send system prompt + user prompt
         └─ Receive AI response
      └─ Return AI response and original prompt

5. SAVE ANALYSIS
   └─ POST /api/analysis
      └─ Validate snippetId exists in database
      └─ Validate analysisType is valid
      └─ Insert into analysis table
      └─ Return new analysis record

6. UPDATE UI
   └─ Set output state with AI response
   └─ Add new analysis to analyses array
   └─ Trigger history sidebar refresh
   └─ Render markdown-formatted response
   └─ Set loading state to false

7. DISPLAY RESULT
   └─ MarkdownRenderer processes AI response
      └─ Parse markdown syntax
      └─ Apply syntax highlighting to code blocks
      └─ Render formatted HTML
   └─ Show previous analyses in collapsed list
   └─ Update history sidebar with new entry
```

---

## ⚙️ Setup & Installation

### Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- **Git**
- **Turso CLI** (optional, for local DB management)
- **Hugging Face Account** (for API key)

### Installation Steps

1. **Clone Repository**:
   ```bash
   git clone <repository-url>
   cd code-review-ai
   ```

2. **Install Dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```

3. **Environment Variables**:
   Create `.env` file:
   ```env
   # Turso Database
   TURSO_CONNECTION_URL=libsql://your-database.turso.io
   TURSO_AUTH_TOKEN=your-turso-token

   # Hugging Face API
   HF_API_KEY=hf_your_api_key
   ```

4. **Database Setup**:
   ```bash
   # Push schema to database
   bun run drizzle-kit push
   ```

5. **Run Development Server**:
   ```bash
   bun run dev
   # or
   npm run dev
   ```

6. **Open Browser**:
   Navigate to `http://localhost:3000`

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | How to Get |
|----------|-------------|------------|
| `TURSO_CONNECTION_URL` | Turso database connection URL | 1. Sign up at [turso.tech](https://turso.tech)<br>2. Create database<br>3. Copy connection URL |
| `TURSO_AUTH_TOKEN` | Turso authentication token | Run `turso db tokens create <db-name>` |
| `HF_API_KEY` | Hugging Face API key | 1. Sign up at [huggingface.co](https://huggingface.co)<br>2. Go to Settings → Access Tokens<br>3. Create fine-grained token with inference permissions |

### Getting Hugging Face API Key

1. Visit https://huggingface.co/settings/tokens
2. Click **"Create new token"**
3. Select **"Fine-grained"** token type
4. Add **"Inference"** permission
5. Generate and copy token (starts with `hf_`)

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure build settings (auto-detected for Next.js)

3. **Add Environment Variables**:
   - In Vercel dashboard → Settings → Environment Variables
   - Add all variables from `.env` file

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Access your live site!

### Build Commands

```bash
# Development
bun run dev

# Production build
bun run build

# Start production server
bun run start

# Database migrations
bun run drizzle-kit generate
bun run drizzle-kit push
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **Monaco Editor Not Loading**

**Symptom**: Blank white box where editor should be

**Solution**:
```bash
bun install @monaco-editor/react
```

Make sure Next.js is configured correctly:
```typescript
// next.config.ts
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};
```

---

#### 2. **Hugging Face API Errors**

**Symptom**: "Failed to analyze code" error

**Solutions**:
- Verify `HF_API_KEY` in `.env` is correct
- Check token has **inference** permissions
- Ensure model name is correct: `meta-llama/Llama-3.1-8B-Instruct`
- Check API rate limits

**Test API Key**:
```bash
curl https://router.huggingface.co/v1/chat/completions \
  -H "Authorization: Bearer $HF_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"meta-llama/Llama-3.1-8B-Instruct","messages":[{"role":"user","content":"Hello"}],"max_tokens":10}'
```

---

#### 3. **Database Connection Errors**

**Symptom**: "Failed to save snippet" or "Database error"

**Solutions**:
- Verify `TURSO_CONNECTION_URL` and `TURSO_AUTH_TOKEN` are correct
- Check database exists: `turso db list`
- Run migrations: `bun run drizzle-kit push`
- Check network connectivity to Turso

---

#### 4. **Build Errors**

**Symptom**: Type errors or module not found

**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules .next
bun install

# Regenerate types
bun run drizzle-kit generate
```

---

#### 5. **Markdown Not Rendering**

**Symptom**: Plain text instead of formatted markdown

**Solution**:
```bash
bun install react-markdown remark-gfm rehype-highlight rehype-raw highlight.js
```

Verify `MarkdownRenderer` component is imported correctly in `EditorPage`.

---

## 📊 Performance Considerations

### Optimization Strategies

1. **Code Splitting**: Next.js automatically splits Monaco Editor code
2. **API Caching**: Consider adding Redis for response caching
3. **Database Indexing**: Add indexes on `created_at` columns for faster queries
4. **Lazy Loading**: Monaco Editor loads on-demand
5. **Edge Functions**: API routes deployed on Vercel Edge for low latency

### Monitoring

- Use Vercel Analytics for page performance
- Monitor Turso dashboard for database queries
- Track Hugging Face API usage and rate limits

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Code editor loads correctly
- [ ] Language selector changes syntax highlighting
- [ ] Analyze button triggers AI response
- [ ] Markdown renders properly in output
- [ ] Previous analyses display correctly
- [ ] History sidebar shows saved snippets
- [ ] Delete button removes snippets
- [ ] Error messages display appropriately
- [ ] Loading states show during API calls
- [ ] Mobile responsive layout works

### API Testing

Use `curl` or Postman to test endpoints:

```bash
# Test create snippet
curl -X POST http://localhost:3000/api/snippets \
  -H "Content-Type: application/json" \
  -d '{"code":"console.log(\"test\")","language":"javascript"}'

# Test AI analysis
curl -X POST http://localhost:3000/api/gemini \
  -H "Content-Type: application/json" \
  -d '{"code":"console.log(\"test\")","language":"javascript","analysisType":"explain"}'
```

---

## 📚 Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Drizzle ORM**: https://orm.drizzle.team/docs
- **Turso**: https://docs.turso.tech/
- **Hugging Face**: https://huggingface.co/docs/inference-endpoints
- **Monaco Editor**: https://microsoft.github.io/monaco-editor/
- **shadcn/ui**: https://ui.shadcn.com/

---

## 👨‍💻 Development Credits

**Project**: AI Code Analysis Platform  
**Developer**: Yukta  
**Course**: [Course Name]  
**Institution**: [University/Institute Name]  
**Year**: 2024

---

## 🎓 Learning Outcomes

This project demonstrates mastery in:

1. **Full-Stack Development**: Next.js 15 with App Router
2. **AI Integration**: Hugging Face API and prompt engineering
3. **Database Design**: Schema design with foreign keys and cascades
4. **API Development**: RESTful API design with proper validation
5. **TypeScript**: Type-safe development across frontend and backend
6. **UI/UX Design**: Responsive design with Tailwind CSS
7. **State Management**: Complex React state handling
8. **Error Handling**: Comprehensive validation and user feedback
9. **Code Quality**: Clean architecture and separation of concerns
10. **Deployment**: Production deployment on Vercel

---

## 📝 License

MIT License - See LICENSE file for details

---

**Last Updated**: November 25, 2025  
**Documentation Version**: 1.0.0
