# ITLead Landing Page

A modern, responsive landing page built with Next.js 15, TypeScript, and SCSS. This is a recreation of the ITLead platform - a comprehensive interview preparation platform for frontend developers.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.7
- **Styling:** SCSS Modules
- **React:** 19.0
- **Node:** >=18.17.0

## ✨ Features

- 🎨 Modern, responsive UI with dark theme
- 🧩 Component-based architecture
- 📱 Mobile-first design
- ♿ Accessible (WCAG compliant)
- 🎭 Smooth animations and transitions
- 🎪 Marquee testimonials with auto-scroll
- 📊 Interactive FAQ accordion
- 🎯 SEO optimized
- 🔥 Performance optimized

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/            # i18n routing (en/ua)
│   │   ├── interview-questions/  # Questions pages
│   │   ├── auth/            # Login/register
│   │   └── onboarding/      # User onboarding
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── modules/                 # Feature modules
│   ├── auth/                # Authentication
│   ├── questions/           # Questions (API integration)
│   ├── problems/            # Coding problems
│   └── onboarding/          # User onboarding
├── components/              # UI components
│   ├── UI/                  # Reusable components
│   ├── Navigation/          # Header/navigation
│   ├── Hero/                # Landing hero
│   └── Documentation/       # Markdown rendering
├── providers/               # React context providers
├── stores/                  # Redux store
└── styles/
    └── globals.scss         # Global styles
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mine-copy
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Styling Architecture

### SCSS Modules
- Component-scoped styles using `.module.scss`
- No naming conflicts
- Automatic critical CSS extraction

### CSS Variables
All design tokens are defined in `globals.scss`:
- Colors (theme-aware)
- Spacing scale
- Typography scale
- Border radius
- Shadows
- Transitions
- Z-index layers

### Theme Support
The application supports dark theme by default with the infrastructure in place for light theme toggle.

## 🧱 Component Library

### UI Components

#### Button
```tsx
<Button variant="primary" size="md">Click me</Button>
```
Variants: `primary`, `secondary`, `outline`, `ghost`
Sizes: `sm`, `md`, `lg`

#### Badge
```tsx
<Badge variant="primary">JavaScript</Badge>
```
Variants: `default`, `primary`, `success`, `warning`, `error`

#### Card
```tsx
<Card hoverable padding="md">
  <CardHeader>Header</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Best Practices Implemented

### Code Quality
- ✅ TypeScript for type safety
- ✅ ESLint for code quality
- ✅ Consistent naming conventions
- ✅ Component composition
- ✅ DRY principles

### Performance
- ✅ Next.js automatic code splitting
- ✅ Optimized images with next/image
- ✅ CSS modules for optimal bundle size
- ✅ Lazy loading for offscreen content

### Accessibility
- ✅ Semantic HTML
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Reduced motion support

### SEO
- ✅ Meta tags optimization
- ✅ Open Graph tags
- ✅ Structured data
- ✅ Semantic markup

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 📢 Recent Updates

### 🚀 Full API Migration Complete (Jan 18, 2026) ✅
All questions now served from PostgreSQL via Drizzle ORM:
- **Backend:** NestJS API with Drizzle ORM (PostgreSQL)
- **Frontend:** Fetches all content from API endpoints
- **6 questions** with full EN/UA translations
- **11 categories** with localized names
- **Real-time updates** - no markdown files needed
- **API endpoints:** `GET /api/questions`, `GET /api/categories`

### ⚠️ Onboarding Feature Temporarily Disabled
The onboarding/quiz functionality is temporarily disabled:
- Redirects to home instead of onboarding wizard
- Content filtering disabled (all sections visible)
- All code preserved with `TEMPORARY` comments
- **To re-enable:** Search for "TEMPORARY: Onboarding"

---

## 🌐 Environment Variables

Create a `.env.local` file for environment-specific variables (if needed).

## 📦 Building for Production

```bash
npm run build
npm run start
```

The application will be optimized for production with:
- Minified bundles
- Optimized images
- Static page generation where possible
- Server-side rendering for dynamic content

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Built with ❤️ as a technical demonstration of modern web development practices.

## 🙏 Acknowledgments

- Original design inspiration from ITLead platform
- Next.js team for the amazing framework
- React team for the powerful library
