# 🚀 AI Code Assistant - Full-Stack Development Project

> A modern, full-stack web application featuring an interactive code editor with integrated AI-powered code analysis, debugging, optimization, and explanation capabilities using Hugging Face AI models.

**Developer:** Yukta  
**Project Goal:** Learn full-stack development, AI integration, prompt engineering, UI/UX design, and deployment workflows through building a practical, real-world application

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Setup Instructions](#-setup-instructions)
- [Environment Variables](#-environment-variables)
- [Usage Guide](#-usage-guide)
- [Deployment](#-deployment)
- [Learning Outcomes](#-learning-outcomes)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Project Overview

This application is a **sophisticated code editor powered by Hugging Face AI** that provides intelligent code analysis, debugging suggestions, optimization tips, and comprehensive code explanations. Built with modern full-stack technologies, it showcases practical real-world use of AI in developer tools.

### What Makes This Project Special?

- **Real-world Application**: Not just a learning project - this is a functional tool developers can actually use
- **AI Integration**: Demonstrates practical implementation of AI APIs in web applications
- **Full-Stack Architecture**: Complete frontend, backend, and database integration
- **Modern Tech Stack**: Uses the latest versions of Next.js, React, TypeScript, and AI models
- **Professional Deployment**: Production-ready application deployed on modern cloud platforms

---

## ✨ Key Features

### 🖥️ Interactive Code Editor
- **Monaco Editor Integration**: The same editor that powers VS Code
- **Syntax Highlighting**: Support for 10+ programming languages (JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, PHP, Ruby)
- **Line Numbers & Formatting**: Professional coding environment
- **Real-time Editing**: Instant feedback as you type

### 🤖 AI-Powered Analysis
- **Error Detection**: Automatically identifies syntax errors, logical bugs, and potential issues
- **Code Fixing**: AI generates corrected versions of your code with explanations
- **Code Explanation**: Breaks down complex code into simple, understandable terms
- **Code Optimization**: Provides performance improvements and best practice recommendations

### 💾 Persistent History
- **Database Storage**: All code snippets and analyses are saved automatically
- **Session Tracking**: Review past analyses and track coding improvements over time
- **Quick Access**: Load previous sessions with a single click
- **Search & Filter**: Find specific code snippets from your history

### 🎨 Modern UI/UX
- **Clean Black & White Design**: Professional, distraction-free interface
- **Dark/Light Mode**: Toggle between themes for comfortable coding
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Clear feedback during AI processing
- **Error Handling**: User-friendly error messages and recovery options

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with App Router | 15.3.5 |
| **React** | UI library with Server Components | 19.0.0 |
| **TypeScript** | Type-safe JavaScript | 5.x |
| **Tailwind CSS** | Utility-first CSS framework | 4.x |
| **Shadcn/UI** | High-quality React components | Latest |
| **Monaco Editor** | Professional code editor | 4.7.0 |

**Why these choices?**
- Next.js 15 provides optimal performance with Server Components and App Router
- TypeScript ensures type safety and better developer experience
- Monaco Editor delivers a VS Code-like editing experience
- Tailwind CSS enables rapid, consistent styling

### Backend & Database
| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js API Routes** | Serverless backend functions | 15.3.5 |
| **Drizzle ORM** | Type-safe database queries | 0.44.7 |
| **Turso** | Distributed SQLite database | Latest |
| **TypeScript** | Type-safe backend code | 5.x |

**Why these choices?**
- Next.js API routes eliminate the need for a separate backend server
- Drizzle ORM provides type safety and excellent TypeScript integration
- Turso offers edge-deployed SQLite with global low latency

### AI Integration
| Technology | Purpose | Model |
|------------|---------|-------|
| **Hugging Face** | AI inference provider | Llama 3.1 8B Instruct |
| **@huggingface/inference** | TypeScript SDK | 4.13.4 |

**Why these choices?**
- Hugging Face provides reliable, free-tier AI inference
- Meta Llama 3.1 8B Instruct is optimized for code understanding
- OpenAI-compatible API format for easy integration

### Development Tools
- **ESLint**: Code quality and consistency
- **Prettier**: Automatic code formatting (via ESLint)
- **Git**: Version control
- **Bun**: Fast package manager and runtime

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                │
│                           ↓                                 │
│                    Web Browser                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Monaco     │  │  React UI    │  │   Tailwind   │     │
│  │   Editor     │  │  Components  │  │     CSS      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         Next.js 15 (App Router + Server Components)        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  /api/       │  │  /api/       │  │  /api/       │     │
│  │  snippets    │  │  gemini      │  │  analysis    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│           Next.js API Routes (Serverless Functions)        │
└─────────────────────────────────────────────────────────────┘
          ↓                                    ↓
┌─────────────────────┐           ┌───────────────────────────┐
│   DATABASE LAYER    │           │    AI INTEGRATION         │
│  ┌──────────────┐   │           │  ┌──────────────────────┐ │
│  │    Turso     │   │           │  │  Hugging Face Router │ │
│  │   (SQLite)   │   │           │  │  Llama 3.1 8B Model  │ │
│  └──────────────┘   │           │  └──────────────────────┘ │
│   Drizzle ORM       │           │   AI Code Analysis        │
└─────────────────────┘           └───────────────────────────┘
```

### Request Flow: User Analyzes Code

```
1. User writes code in Monaco Editor
   ↓
2. User selects programming language from dropdown
   ↓
3. User clicks "Analyze" button
   ↓
4. Frontend shows loading spinner
   ↓
5. POST /api/snippets → Save code snippet to database
   ↓ (returns snippet ID)
6. POST /api/gemini → Send code to Hugging Face AI
   ↓ (AI processes and returns analysis)
7. POST /api/analysis → Save AI response to database
   ↓
8. Frontend displays AI response in output panel
   ↓
9. User sees results, can click other actions (Fix, Explain, Optimize)
```

---

## 💾 Database Schema

### Entity Relationship Diagram

```
┌─────────────────────────────┐
│     code_snippet            │
├─────────────────────────────┤
│ id (PK)          INTEGER    │
│ code             TEXT       │
│ language         TEXT       │
│ created_at       TEXT       │
│ updated_at       TEXT       │
└─────────────────────────────┘
          │ 1
          │
          │ has many
          │
          │ N
┌─────────────────────────────┐
│        analysis             │
├─────────────────────────────┤
│ id (PK)          INTEGER    │
│ snippet_id (FK)  INTEGER    │
│ analysis_type    TEXT       │
│ prompt           TEXT       │
│ response         TEXT       │
│ created_at       TEXT       │
└─────────────────────────────┘
```

### Table Details

#### `code_snippet`
Stores code snippets submitted by users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique identifier |
| `code` | TEXT | NOT NULL | Source code content |
| `language` | TEXT | NOT NULL | Programming language (e.g., "javascript") |
| `created_at` | TEXT | NOT NULL | ISO timestamp of creation |
| `updated_at` | TEXT | NOT NULL | ISO timestamp of last update |

#### `analysis`
Stores AI analysis results linked to code snippets.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique identifier |
| `snippet_id` | INTEGER | NOT NULL, FOREIGN KEY | References `code_snippet.id` |
| `analysis_type` | TEXT | NOT NULL | Type: "analyze", "fix", "explain", "optimize" |
| `prompt` | TEXT | NOT NULL | The prompt sent to AI |
| `response` | TEXT | NOT NULL | AI-generated response |
| `created_at` | TEXT | NOT NULL | ISO timestamp of creation |

**Relationship**: One code snippet can have many analyses (1:N relationship)  
**Cascade Delete**: Deleting a snippet automatically deletes all its analyses

---

## 🔌 API Endpoints

### 1. **POST /api/snippets**
**Purpose**: Save a new code snippet to the database

**Request Body**:
```json
{
  "code": "function hello() { console.log('test'); }",
  "language": "javascript"
}
```

**Response (200 OK)**:
```json
{
  "id": 1,
  "code": "function hello() { console.log('test'); }",
  "language": "javascript",
  "createdAt": "2025-11-25T12:00:00Z",
  "updatedAt": "2025-11-25T12:00:00Z"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "Missing required fields: code, language"
}
```

---

### 2. **POST /api/gemini**
**Purpose**: Send code to Hugging Face AI for analysis

**Request Body**:
```json
{
  "code": "function hello() { console.log('test'); }",
  "language": "javascript",
  "analysisType": "analyze"
}
```

**Analysis Types**:
- `"analyze"`: Find errors, bugs, and improvements
- `"fix"`: Generate corrected code with explanations
- `"explain"`: Break down code in simple terms
- `"optimize"`: Improve performance and best practices

**Response (200 OK)**:
```json
{
  "response": "**Code Analysis:**\n\nThe function `hello` is a simple...",
  "prompt": "Analyze the following javascript code for errors..."
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "Missing required fields"
}
```

**Error Response (500 Internal Server Error)**:
```json
{
  "error": "Failed to analyze code: Hugging Face API error: ..."
}
```

---

### 3. **POST /api/analysis**
**Purpose**: Save AI analysis result to the database

**Request Body**:
```json
{
  "snippetId": 1,
  "analysisType": "analyze",
  "prompt": "Analyze the following javascript code...",
  "response": "The function `hello` is a simple function..."
}
```

**Response (200 OK)**:
```json
{
  "id": 1,
  "snippetId": 1,
  "analysisType": "analyze",
  "prompt": "Analyze the following javascript code...",
  "response": "The function `hello` is a simple function...",
  "createdAt": "2025-11-25T12:00:00Z"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "Missing required fields"
}
```

---

### 4. **GET /api/snippets**
**Purpose**: Retrieve all code snippets with their analyses

**Response (200 OK)**:
```json
[
  {
    "id": 1,
    "code": "function hello() { console.log('test'); }",
    "language": "javascript",
    "createdAt": "2025-11-25T12:00:00Z",
    "updatedAt": "2025-11-25T12:00:00Z",
    "analyses": [
      {
        "id": 1,
        "analysisType": "analyze",
        "response": "The function is simple...",
        "createdAt": "2025-11-25T12:01:00Z"
      }
    ]
  }
]
```

---

### 5. **DELETE /api/snippets/[id]**
**Purpose**: Delete a code snippet and all its analyses

**Response (200 OK)**:
```json
{
  "message": "Snippet deleted successfully"
}
```

**Error Response (404 Not Found)**:
```json
{
  "error": "Snippet not found"
}
```

---

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have:
- **Node.js**: Version 18.0 or higher ([Download](https://nodejs.org/))
- **Bun**: Fast package manager ([Install](https://bun.sh/))
- **Git**: Version control ([Download](https://git-scm.com/))
- **Hugging Face Account**: For API key ([Sign up](https://huggingface.co/join))

### Step 1: Clone the Repository

```bash
git clone <https://github.com/XYuktaaa/codeReview>
cd codeReview
```

### Step 2: Install Dependencies

```bash
bun install
```

This installs all required packages including:
- Next.js, React, TypeScript
- Hugging Face SDK
- Drizzle ORM, Turso client
- Monaco Editor, Shadcn/UI components

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following variables (see [Environment Variables](#-environment-variables) section for details):

```env
# Database
TURSO_CONNECTION_URL=your_turso_connection_url
TURSO_AUTH_TOKEN=your_turso_auth_token

# Hugging Face AI
HF_API_KEY=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
```

### Step 4: Set Up the Database

#### Option A: Using Turso (Recommended for Production)

1. **Install Turso CLI**:
   ```bash
   curl -sSfL https://get.tur.so/install.sh | bash
   ```

2. **Create a Database**:
   ```bash
   turso db create ai-code-assistant
   ```

3. **Get Connection Details**:
   ```bash
   turso db show ai-code-assistant --url
   turso db tokens create ai-code-assistant
   ```

4. **Update `.env`** with the URL and token

5. **Run Migrations**:
   ```bash
   bun run db:push
   ```

#### Option B: Using Local SQLite (Development)

1. **Update `.env`**:
   ```env
   TURSO_CONNECTION_URL=file:./local.db
   TURSO_AUTH_TOKEN=
   ```

2. **Run Migrations**:
   ```bash
   bun run db:push
   ```

### Step 5: Run the Development Server

```bash
bun run dev
```

The application will be available at **http://localhost:3000**

### Step 6: Verify Setup

1. Open http://localhost:3000 in your browser
2. Write some code in the editor
3. Click "Analyze" to test the AI integration
4. Check the History sidebar to verify database storage

---

## 🔐 Environment Variables

### Required Variables

#### `HF_API_KEY`
- **Purpose**: Authentication for Hugging Face AI API
- **How to get**:
  1. Go to https://huggingface.co/settings/tokens
  2. Click "Create new token"
  3. Name: "ai-code-assistant" (or any name)
  4. Type: Select **"Fine-grained"**
  5. Permissions: Enable **"Make calls to inference"**
  6. Click "Create token"
  7. Copy the token (starts with `hf_...`)
- **Format**: `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`
- **IMPORTANT**: The token MUST have **fine-grained** access with **inference permissions** enabled

#### `TURSO_CONNECTION_URL`
- **Purpose**: Database connection string
- **Format**: 
  - Production: `libsql://[database-name]-[org].turso.io`
  - Development: `file:./local.db`
- **How to get**: Run `turso db show <database-name> --url`

#### `TURSO_AUTH_TOKEN`
- **Purpose**: Database authentication
- **Format**: Long JWT string (e.g., `eyJhbGciOiJFZERTQSI...`)
- **How to get**: Run `turso db tokens create <database-name>`
- **Note**: Can be empty for local SQLite (`file:./local.db`)

### Example `.env` File

```env
# Production Configuration
TURSO_CONNECTION_URL=libsql://ai-code-assistant-myorg.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...
HF_API_KEY=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

# Development Configuration (Alternative)
TURSO_CONNECTION_URL=file:./local.db
TURSO_AUTH_TOKEN=
HF_API_KEY=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
```

### Security Best Practices

- ✅ **NEVER commit `.env` to Git** (already in `.gitignore`)
- ✅ **Use different keys for development and production**
- ✅ **Rotate API keys regularly**
- ✅ **Set up environment variables in Vercel dashboard for deployment**

---

## 📖 Usage Guide

### Basic Workflow

1. **Open the Application**: Navigate to http://localhost:3000
2. **Select Language**: Choose from 10+ supported languages in the dropdown
3. **Write Code**: Type or paste your code in the Monaco Editor
4. **Choose Action**: Click one of four AI-powered buttons:
   - **Analyze**: Find errors, bugs, and improvements
   - **Fix**: Get corrected code with explanations
   - **Explain**: Understand code in simple terms
   - **Optimize**: Improve performance and best practices
5. **View Results**: AI response appears in the output panel
6. **Review History**: Access past analyses in the sidebar
7. **Start New**: Click "New" to clear and start fresh

### Supported Programming Languages

- JavaScript
- TypeScript
- Python
- Java
- C++
- C#
- Go
- Rust
- PHP
- Ruby

### AI Analysis Types Explained

#### 1. **Analyze**
- **Purpose**: Comprehensive code review
- **Output**: Identifies errors, potential bugs, code smells, and improvement suggestions
- **Best for**: Initial code review, learning, finding hidden issues

**Example**:
```javascript
// Input
function divide(a, b) {
  return a / b;
}

// AI Output
"Potential bug: No validation for division by zero. If b is 0, 
this will return Infinity. Add a check: if (b === 0) throw new Error()..."
```

#### 2. **Fix**
- **Purpose**: Automatically correct code issues
- **Output**: Corrected code with detailed explanations
- **Best for**: Quick bug fixes, learning correct patterns

**Example**:
```javascript
// Input
function divide(a, b) {
  return a / b;
}

// AI Output
"function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

Fixed: Added zero division check to prevent Infinity result..."
```

#### 3. **Explain**
- **Purpose**: Educational breakdown of code
- **Output**: Simple, beginner-friendly explanation
- **Best for**: Learning new concepts, understanding complex code

**Example**:
```javascript
// Input
const users = data.filter(u => u.age > 18).map(u => u.name);

// AI Output
"This code does 3 things:
1. Takes a list of users (data)
2. Filters to keep only users older than 18
3. Extracts just the names into a new array..."
```

#### 4. **Optimize**
- **Purpose**: Performance and readability improvements
- **Output**: Optimized code with performance metrics
- **Best for**: Production code, performance-critical sections

**Example**:
```javascript
// Input
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// AI Output
"arr.forEach(item => console.log(item));

Improvements:
- More readable and concise
- Better performance (no repeated .length lookup)
- Follows modern JavaScript best practices..."
```

### Tips for Best Results

- **Be Specific**: Provide complete, runnable code when possible
- **Add Comments**: Explain what you're trying to achieve
- **Use Correct Language**: Select the right programming language
- **Try Multiple Actions**: Each action provides different insights
- **Save Good Examples**: Use history to reference working solutions

---

## 🌐 Deployment

### Deploying to Vercel (Recommended)

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <https://github.com/XYuktaaa/codeReview>
git push -u origin main
```

#### Step 2: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `bun run build`
   - **Install Command**: `bun install`

#### Step 3: Set Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

```
HF_API_KEY=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
TURSO_CONNECTION_URL=libsql://your-production-db.turso.io
TURSO_AUTH_TOKEN=your_production_token
```

**Important**: Use your **production** Hugging Face token and Turso credentials!

#### Step 4: Deploy

Click **"Deploy"** - Vercel will:
- Install dependencies
- Build the application
- Deploy to global CDN
- Provide a public URL (e.g., `https://ai-code-assistant.vercel.app`)

#### Step 5: Run Database Migrations

After first deployment, run migrations on your production database:

```bash
turso db shell ai-code-assistant-prod < drizzle/migrations/0000_initial.sql
```

Or use Drizzle migrations:

```bash
DATABASE_URL=your_production_url bun run db:push
```

### Custom Domain (Optional)

1. In Vercel → Settings → Domains
2. Add your custom domain (e.g., `codechat.yourdomain.com`)
3. Update DNS records as instructed
4. SSL certificate is automatically configured

### Deployment Checklist

- ✅ Environment variables set in Vercel
- ✅ Production database created and migrated
- ✅ Hugging Face API key has inference permissions
- ✅ Build succeeds without errors
- ✅ Test all features in production
- ✅ Monitor usage at https://vercel.com/analytics

---

## 🎓 Learning Outcomes

This project demonstrates mastery of:

### Technical Skills

#### Full-Stack Development
- ✅ Building modern web applications with Next.js 15 App Router
- ✅ Server-side rendering and server components
- ✅ Client-side interactivity with React hooks
- ✅ TypeScript for type-safe development

#### Backend Development
- ✅ RESTful API design and implementation
- ✅ Request validation and error handling
- ✅ Serverless function architecture
- ✅ Database schema design and relationships

#### Database Management
- ✅ SQL database design (SQLite/Turso)
- ✅ ORM implementation with Drizzle
- ✅ Migrations and schema versioning
- ✅ Efficient queries and data relationships

#### AI Integration
- ✅ Hugging Face API integration
- ✅ Prompt engineering for code analysis
- ✅ Response parsing and formatting
- ✅ Error handling for AI services

#### UI/UX Design
- ✅ Modern, clean interface design
- ✅ Responsive layouts with Tailwind CSS
- ✅ Loading states and user feedback
- ✅ Dark/light mode implementation

### Professional Skills

#### Software Engineering
- ✅ Project architecture and planning
- ✅ Code organization and best practices
- ✅ Git version control workflow
- ✅ Environment configuration management

#### DevOps & Deployment
- ✅ Cloud platform deployment (Vercel)
- ✅ Environment variable management
- ✅ Continuous integration/deployment (CI/CD)
- ✅ Production monitoring and debugging

#### Problem Solving
- ✅ Breaking down complex requirements
- ✅ Debugging and troubleshooting
- ✅ Performance optimization
- ✅ Security best practices

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. **Hugging Face API Errors**

**Error**: `"Hugging Face API error: Unauthorized"`

**Solution**:
- Verify your `HF_API_KEY` is correct in `.env`
- Ensure the token has **fine-grained** access with **inference permissions**
- Create a new token at https://huggingface.co/settings/tokens
- Restart the development server after updating `.env`

**Error**: `"You don't have access to use Inference Providers"`

**Solution**:
- Your token needs inference provider permissions
- Go to https://huggingface.co/settings/tokens
- Create a **new fine-grained token**
- Enable "Make calls to inference" permission
- Update `HF_API_KEY` in `.env`

---

#### 2. **Database Connection Errors**

**Error**: `"Failed to connect to database"`

**Solution**:
- Check `TURSO_CONNECTION_URL` format:
  - Local: `file:./local.db`
  - Production: `libsql://[database].turso.io`
- Verify `TURSO_AUTH_TOKEN` is correct (can be empty for local)
- Run `bun run db:push` to create tables
- Ensure database file permissions (for local SQLite)

---

#### 3. **Build Errors**

**Error**: `"Module not found: Can't resolve '@/components/..."`

**Solution**:
- Ensure all dependencies are installed: `bun install`
- Check TypeScript paths in `tsconfig.json`
- Restart the development server: `bun run dev`
- Clear Next.js cache: `rm -rf .next && bun run dev`

---

#### 4. **Monaco Editor Not Loading**

**Error**: Blank editor or loading indefinitely

**Solution**:
- Check browser console for errors
- Ensure `@monaco-editor/react` is installed: `bun install @monaco-editor/react`
- Clear browser cache and reload
- Try a different browser

---

#### 5. **Environment Variables Not Working**

**Error**: `"process.env.HF_API_KEY is undefined"`

**Solution**:
- Environment variables must be prefixed with `NEXT_PUBLIC_` for client-side access
- Server-side (API routes) can use any variable name
- Restart dev server after changing `.env`
- For Vercel: Set variables in dashboard → Settings → Environment Variables
- Redeploy after adding environment variables

---

#### 6. **AI Responses Too Slow**

**Issue**: Analysis takes >10 seconds

**Solution**:
- This is normal for free-tier Hugging Face models
- Llama 3.1 8B is a large model that may have cold starts
- Consider upgrading to Hugging Face Pro for faster inference
- Alternative: Switch to a smaller, faster model in `/api/gemini/route.ts`

---

### Need More Help?

- **Hugging Face Docs**: https://huggingface.co/docs/api-inference
- **Next.js Docs**: https://nextjs.org/docs
- **Drizzle ORM Docs**: https://orm.drizzle.team/docs
- **Turso Docs**: https://docs.turso.tech

---

## 📁 Project Structure

```
ai-code-assistant/
├── drizzle/                    # Database migrations
│   └── meta/                   # Migration metadata
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/              # About page
│   │   │   └── page.tsx
│   │   ├── api/                # API routes (backend)
│   │   │   ├── analysis/       # Analysis CRUD
│   │   │   │   └── route.ts
│   │   │   ├── gemini/         # AI integration
│   │   │   │   └── route.ts
│   │   │   └── snippets/       # Snippet CRUD
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage (main editor)
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── ui/                 # Shadcn/UI components
│   │   ├── CodeEditor.tsx      # Monaco Editor wrapper
│   │   ├── HistorySidebar.tsx  # History panel
│   │   └── ThemeToggle.tsx     # Dark/light mode
│   ├── db/                     # Database
│   │   ├── index.ts            # Database connection
│   │   └── schema.ts           # Drizzle schema
│   ├── lib/                    # Utilities
│   │   └── utils.ts
│   └── hooks/                  # Custom React hooks
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── drizzle.config.ts           # Drizzle configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies
├── README.md                   # This file
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 📊 Database Commands

### Run Migrations
```bash
bun run db:push
```

### Generate Migrations (after schema changes)
```bash
bun run db:generate
```

### Open Database Studio
```bash
bun run db:studio
```

### Access Turso Shell
```bash
turso db shell <database-name>
```

---

## 🤝 Contributing

This is an educational project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is created for educational purposes as part of [Course Name] at [University/Institute Name].

---

## 🙏 Acknowledgments

- **Hugging Face** for providing free AI inference
- **Vercel** for hosting and deployment
- **Turso** for edge database infrastructure
- **Monaco Editor** for the professional code editor
- **Shadcn/UI** for beautiful React components

---
