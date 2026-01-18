# Onboarding/Quiz Feature - Temporarily Disabled

## Overview
This document tracks the temporary disabling of the onboarding/quiz functionality across both frontend and backend. All code has been preserved with clear comments for easy re-enabling.

## Date
January 18, 2026

## Status
**TEMPORARILY DISABLED** - All functionality commented out but preserved

---

## Frontend Changes (`/Users/petro/Desktop/mine-copy`)

### 1. Onboarding Page Route
**File:** `src/app/[locale]/onboarding/page.tsx`

**Changes:**
- Commented out `OnboardingWizard` component import
- Added temporary redirect to home page
- Preserved original code in comments

**Behavior:** Users accessing `/onboarding` are now redirected to home page

---

### 2. Authentication Flow
**File:** `src/modules/auth/hooks/use-auth.ts`

**Changes:**
- **`useRegister` hook:** Removed onboarding redirect after registration
  - Now always redirects to home page instead of checking `onboardingCompleted`
- **`useLogin` hook:** Removed onboarding redirect after login
  - Now always redirects to home page instead of checking `onboardingCompleted`

**Behavior:** New users and existing users go directly to home after auth, skipping onboarding

---

### 3. Content Filtering
**File:** `src/components/Documentation/DocumentationSidebar.tsx`

**Changes:**
- Commented out `useFilteredSections` hook import
- Disabled filtering logic
- All sections now shown by default

**Behavior:** All documentation sections visible to all users

---

### 4. Filtering Hooks
**File:** `src/modules/onboarding/hooks/use-filtered-content.ts`

**Changes:**
- Added header comment indicating temporary status
- Commented out hook dependencies (useAuth, useOnboardingProfile)
- **`useFilteredSections`:** Now returns all sections without filtering
- **`useSectionVisibility`:** Now returns all sections as visible

**Behavior:** No content filtering based on user preferences

---

### 5. Onboarding Module Components
**Files:** All files in `src/modules/onboarding/`

- `components/OnboardingWizard.tsx` - Header comment added
- `components/ExperienceLevelStep.tsx` - Header comment added
- `components/TechnologiesStep.tsx` - Header comment added
- `components/LearningGoalStep.tsx` - Header comment added
- `components/FocusAreasStep.tsx` - Header comment added
- `components/SummaryStep.tsx` - Header comment added
- `components/index.ts` - Header comment added
- `hooks/use-onboarding.ts` - Header comment added
- `services/onboarding.service.ts` - Header comment added
- `types/onboarding.types.ts` - Header comment added
- `index.ts` - Header comment added

**Behavior:** Components and hooks are preserved but marked as temporarily disabled

---

## Backend Changes (`/Users/petro/Desktop/mine-copy-backend`)

### 1. Onboarding Module
**File:** `src/modules/onboarding/onboarding.module.ts`

**Changes:**
- Added header comment
- Commented out controller import
- Removed controller from module controllers array
- Service still provided for potential future use

**Behavior:** No HTTP endpoints exposed for onboarding

---

### 2. Onboarding Controller
**File:** `src/modules/onboarding/controllers/onboarding.controller.ts`

**Changes:**
- Added header comment
- Commented out all route handlers:
  - `GET /onboarding/profile`
  - `PATCH /onboarding/profile`
  - `GET /onboarding/options`

**Behavior:** All onboarding API routes are disabled

---

### 3. Onboarding Service
**File:** `src/modules/onboarding/services/onboarding.service.ts`

**Changes:**
- Added header comment indicating temporary status
- Service methods preserved for future use

**Behavior:** Service exists but no routes call it

---

### 4. DTOs
**File:** `src/modules/onboarding/dto/onboarding.dto.ts`

**Changes:**
- Added header comment
- All DTOs preserved for type safety

**Behavior:** Types available but unused

---

### 5. App Module
**File:** `src/app.module.ts`

**Changes:**
- Added comment noting OnboardingModule is imported but routes disabled

**Behavior:** Module loaded but no endpoints active

---

## Database Schema
**Status:** UNCHANGED

The database schema and Prisma models remain intact:
- `UserProfile` table still exists
- `onboardingCompleted` field on Account table still exists
- All onboarding-related migrations preserved

This allows easy re-enabling without database changes.

---

## How to Re-Enable

### Quick Search
Search for these patterns across both codebases:
- `TEMPORARY: Onboarding`
- `TODO: Re-enable when onboarding feature is ready`
- `TEMPORARILY COMMENTED OUT`

### Step-by-Step Re-enabling

#### Frontend
1. **Onboarding Page** (`src/app/[locale]/onboarding/page.tsx`)
   - Uncomment `OnboardingWizard` import
   - Restore original return statement
   - Remove redirect logic

2. **Auth Hooks** (`src/modules/auth/hooks/use-auth.ts`)
   - Uncomment onboarding redirect logic in `useRegister`
   - Uncomment onboarding redirect logic in `useLogin`
   - Remove temporary direct redirects

3. **Sidebar** (`src/components/Documentation/DocumentationSidebar.tsx`)
   - Uncomment `useFilteredSections` import
   - Restore filtering logic
   - Remove hardcoded section display

4. **Filtering Hooks** (`src/modules/onboarding/hooks/use-filtered-content.ts`)
   - Uncomment hook dependencies
   - Restore original logic in both hooks

#### Backend
1. **Module** (`src/modules/onboarding/onboarding.module.ts`)
   - Uncomment controller import
   - Add controller back to controllers array

2. **Controller** (`src/modules/onboarding/controllers/onboarding.controller.ts`)
   - Uncomment all route handlers

---

## Testing Checklist (After Re-enabling)

### Frontend
- [ ] `/onboarding` page loads correctly
- [ ] New registration redirects to onboarding
- [ ] Login redirects to onboarding if not completed
- [ ] Onboarding completion redirects to home
- [ ] Content filtering works based on selected technologies
- [ ] "Show all sections" toggle works in sidebar

### Backend
- [ ] `GET /onboarding/profile` returns user profile
- [ ] `PATCH /onboarding/profile` updates profile
- [ ] `GET /onboarding/options` returns available options
- [ ] Profile creation works on first access
- [ ] Onboarding completion updates account status

### Integration
- [ ] Frontend-backend communication works
- [ ] User preferences persist after completion
- [ ] Filtered content matches selected technologies
- [ ] Can skip onboarding if already completed

---

## Notes
- All TypeScript types preserved for type safety
- No breaking changes to existing functionality
- Database schema unchanged
- Service layer intact for easy re-enabling
- All original code preserved in comments

---

## Related Files Modified

### Frontend (14 files)
1. `src/app/[locale]/onboarding/page.tsx`
2. `src/modules/auth/hooks/use-auth.ts`
3. `src/components/Documentation/DocumentationSidebar.tsx`
4. `src/modules/onboarding/hooks/use-filtered-content.ts`
5. `src/modules/onboarding/hooks/use-onboarding.ts`
6. `src/modules/onboarding/services/onboarding.service.ts`
7. `src/modules/onboarding/types/onboarding.types.ts`
8. `src/modules/onboarding/components/OnboardingWizard.tsx`
9. `src/modules/onboarding/components/ExperienceLevelStep.tsx`
10. `src/modules/onboarding/components/TechnologiesStep.tsx`
11. `src/modules/onboarding/components/LearningGoalStep.tsx`
12. `src/modules/onboarding/components/FocusAreasStep.tsx`
13. `src/modules/onboarding/components/SummaryStep.tsx`
14. `src/modules/onboarding/components/index.ts`
15. `src/modules/onboarding/index.ts`
16. `README.md`

### Backend (5 files)
1. `src/modules/onboarding/onboarding.module.ts`
2. `src/modules/onboarding/controllers/onboarding.controller.ts`
3. `src/modules/onboarding/services/onboarding.service.ts`
4. `src/modules/onboarding/dto/onboarding.dto.ts`
5. `src/app.module.ts`

---

## Contact
For questions about re-enabling this feature, search for the comment markers listed in the "How to Re-Enable" section.
