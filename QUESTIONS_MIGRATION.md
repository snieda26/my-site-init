# Questions Migration to Database

## Overview
All interview questions have been successfully migrated from frontend markdown files to the backend database. Questions are now served via API while maintaining full markdown support.

## Date
January 18, 2026

## Status
**COMPLETED** - Questions now stored in PostgreSQL database

---

## What Changed

### Backend Changes

#### 1. Database Schema Updated
**File:** `prisma/schema.prisma`

**Changes:**
- Added localization support (English/Ukrainian)
- `Category` model:
  - `name` → `nameEn` and `nameUa`
- `Question` model:
  - `title` → `titleEn` and `titleUa`
  - `content` + `answer` → `contentMarkdown` (combined markdown)
  - Added `descriptionEn` and `descriptionUa`
  - Added `prevSlug` and `nextSlug` for navigation
  - Removed separate `answer` field

#### 2. Seed Script Created
**File:** `prisma/seed-questions.ts`

**Purpose:**
- Reads all markdown files from frontend (`/mine-copy/src/content/docs/`)
- Parses frontmatter and content
- Imports into database
- Preserves all metadata and navigation links

**Usage:**
```bash
cd /Users/petro/Desktop/mine-copy-backend
npx tsx prisma/seed-questions.ts
```

#### 3. API Updated
**Files Updated:**
- `src/modules/questions/dto/question.dto.ts` - Updated DTOs for localized fields
- `src/modules/questions/dto/category.dto.ts` - Updated DTOs for localized fields
- `src/modules/questions/services/questions.service.ts` - Uses new schema

**Endpoints:**
- `GET /questions` - Get all questions with pagination
- `GET /questions/:slug` - Get question by slug (returns markdown)
- `GET /questions/category/:categorySlug` - Get questions by category
- `GET /categories` - Get all categories
- `GET /categories/:slug` - Get category by slug

---

### Frontend Changes

#### 1. Types Updated
**File:** `src/modules/questions/types/questions.types.ts`

**Changes:**
- Added localization support
- Updated `Question` interface with new fields
- Updated `Category` interface with `nameEn`/`nameUa`
- Added helper functions: `getLocalizedTitle()`, `getLocalizedDescription()`, `getLocalizedCategoryName()`

#### 2. New Hook Created
**File:** `src/modules/questions/hooks/use-categories-with-questions.ts`

**Purpose:**
- Fetches all categories with their questions from API
- Used by sidebar and questions grid
- Caches data for 5 minutes

#### 3. Page Components Updated
**File:** `src/app/[locale]/interview-questions/[section]/[question]/page.tsx`

**Changes:**
- Removed `getDocBySlug()` from local file system
- Now fetches from API using `questionsService.getQuestionBySlug()`
- Markdown rendering remains unchanged

#### 4. Sidebar Updated
**File:** `src/components/Documentation/DocumentationSidebar.tsx`

**Changes:**
- Removed `docsConfig` import
- Uses `useCategoriesWithQuestions()` hook
- Fetches data from API
- Shows loading state

#### 5. Questions Grid Updated
**File:** `src/components/Documentation/QuestionsGrid.tsx`

**Changes:**
- Removed `docsConfig` import
- Uses `useCategoriesWithQuestions()` hook
- Fetches data from API
- Shows loading state

---

## Markdown Support

### ✅ Fully Preserved

**What Still Works:**
- Markdown syntax (headings, lists, code blocks, etc.)
- Syntax highlighting in code blocks
- Frontmatter metadata (title, description, navigation)
- Prev/Next navigation links
- Localization (English/Ukrainian)

**How It Works:**
1. Markdown content stored in `contentMarkdown` field in database
2. Frontend fetches markdown via API
3. Components render markdown using existing markdown renderer
4. No changes needed to rendering logic

---

## Current Database Content

### Seeded Questions

**Categories:** 11
- HTML & CSS
- JavaScript
- TypeScript
- React
- Vue
- Angular
- Redux
- General Questions
- Architecture
- Principles
- Patterns

**Questions:** 6
1. **TypeScript:**
   - decorators
   - type-vs-interface
   - generic

2. **React:**
   - virtual-dom
   - usestate
   - useref

---

## File Structure

### Deprecated Files (Kept for Reference)
- `src/content/docs/_config.ts` - Config file (no longer used)
- `src/content/docs/*/`*.md` - Markdown files (no longer read)
- `src/lib/docs.ts` - File system reader (no longer used)

**Note:** These files are kept for reference but are not read by the application.

---

## Adding New Questions

### Method 1: Via Seed Script (Recommended for Bulk)

1. Add markdown file to `/mine-copy/src/content/docs/[category]/[slug].md`:

```markdown
---
title: Your Question Title
description: Question description
section: typescript
slug: your-question-slug
prev: previous-slug
next: next-slug
---

## Your Question Content

Markdown content here...
```

2. Run seed script:
```bash
cd /Users/petro/Desktop/mine-copy-backend
npx tsx prisma/seed-questions.ts
```

### Method 2: Via API (For Individual Questions)

```bash
POST /questions
Content-Type: application/json

{
  "slug": "your-question-slug",
  "titleEn": "Your Question Title",
  "titleUa": "Назва питання",
  "descriptionEn": "Question description",
  "descriptionUa": "Опис питання",
  "contentMarkdown": "## Content\n\nMarkdown here...",
  "categoryId": "category-id",
  "difficulty": "MEDIUM",
  "order": 1,
  "prevSlug": "previous-question",
  "nextSlug": "next-question"
}
```

### Method 3: Admin Panel (Future)
Coming soon - Web interface for managing questions.

---

## Running the Application

### 1. Start Backend
```bash
cd /Users/petro/Desktop/mine-copy-backend
npm run dev
```

Backend runs on: `http://localhost:3001`

### 2. Start Frontend
```bash
cd /Users/petro/Desktop/mine-copy
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 3. Verify Migration
- Navigate to `http://localhost:3000/en/interview-questions`
- You should see questions from the database
- Click on any question to verify markdown rendering
- Check navigation (prev/next links)

---

## API Examples

### Get All Questions
```bash
curl http://localhost:3001/questions
```

### Get Question by Slug
```bash
curl http://localhost:3001/questions/type-vs-interface
```

Response:
```json
{
  "id": "clx...",
  "slug": "type-vs-interface",
  "titleEn": "Differences Between type and interface in TypeScript",
  "titleUa": "Differences Between type and interface in TypeScript",
  "contentMarkdown": "## Interface\n\n- **interface** is used to...",
  "difficulty": "MEDIUM",
  "order": 2,
  "prevSlug": "decorators",
  "nextSlug": "generic",
  "category": {
    "id": "clx...",
    "slug": "typescript",
    "nameEn": "TypeScript",
    "nameUa": "TypeScript"
  }
}
```

### Get Categories
```bash
curl http://localhost:3001/categories
```

### Get Questions by Category
```bash
curl http://localhost:3001/questions/category/typescript
```

---

## Benefits of Migration

✅ **Centralized Content Management**
- Single source of truth in database
- No need to deploy frontend for content changes

✅ **Better Performance**
- API caching
- Efficient pagination
- Reduced frontend bundle size

✅ **Improved Scalability**
- Easy to add new questions via API
- Support for multiple languages
- Can add more metadata without changing file structure

✅ **Better Search & Filtering**
- Database queries more efficient than file system
- Can add full-text search
- Advanced filtering by difficulty, category, tags

✅ **Markdown Preserved**
- No changes to content format
- Existing markdown files can still be used for seeding
- Full markdown support maintained

---

## Troubleshooting

### Questions Not Loading

**Symptom:** Frontend shows "Loading..." indefinitely

**Solutions:**
1. Verify backend is running: `curl http://localhost:3001/health`
2. Check database connection in backend `.env`
3. Verify questions exist: `curl http://localhost:3001/questions`
4. Check browser console for errors

### Markdown Not Rendering

**Symptom:** Markdown shows as plain text

**Solutions:**
1. Verify `contentMarkdown` field has data
2. Check markdown renderer component is imported
3. Verify no TypeScript errors in console

### Seed Script Fails

**Symptom:** `npx tsx prisma/seed-questions.ts` errors

**Solutions:**
1. Ensure frontend path is correct in seed script
2. Run `npx prisma generate` first
3. Verify database is accessible
4. Check migration is applied: `npx prisma migrate status`

---

## Future Enhancements

### Planned Features
- [ ] Admin panel for question management
- [ ] Ukrainian translations for all questions
- [ ] Full-text search
- [ ] Question difficulty auto-detection
- [ ] Related questions suggestions
- [ ] Question versioning/history
- [ ] Collaborative editing
- [ ] Import/Export functionality

---

## Migration Statistics

| Metric | Count |
|--------|-------|
| Categories Migrated | 11 |
| Questions Migrated | 6 |
| Markdown Files Processed | 6 |
| API Endpoints Created | 7 |
| Frontend Components Updated | 3 |
| New Hooks Created | 1 |
| Database Tables Updated | 2 |

---

## Related Files

### Backend
- `prisma/schema.prisma` - Database schema
- `prisma/seed-questions.ts` - Seed script
- `src/modules/questions/` - Questions module
- `src/modules/questions/services/questions.service.ts` - Service layer
- `src/modules/questions/controllers/questions.controller.ts` - API controllers
- `src/modules/questions/dto/` - Data transfer objects

### Frontend
- `src/modules/questions/` - Questions module
- `src/modules/questions/hooks/use-categories-with-questions.ts` - API hook
- `src/app/[locale]/interview-questions/[section]/[question]/page.tsx` - Question page
- `src/components/Documentation/DocumentationSidebar.tsx` - Sidebar
- `src/components/Documentation/QuestionsGrid.tsx` - Questions grid

---

## Contact
For questions about this migration, search for comments containing:
- `DEPRECATED: This file is no longer used`
- `Fetches from API` 
- `useCategoriesWithQuestions`
