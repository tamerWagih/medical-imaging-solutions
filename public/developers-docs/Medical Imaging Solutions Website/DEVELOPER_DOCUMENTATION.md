# Medical Imaging Solutions - Developer Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Project Structure](#project-structure)
4. [Key Components](#key-components)
5. [Data Management](#data-management)
6. [Styling System](#styling-system)
7. [Development Workflow](#development-workflow)
8. [Deployment](#deployment)
9. [API & Integration Points](#api--integration-points)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)
12. [Contributing](#contributing)

---

## Project Overview

### Purpose
The Medical Imaging Solutions website is a comprehensive Next.js application showcasing two specialized medical imaging platforms:
- **RadView**: Comprehensive radiomics feature extraction and visualization platform
- **HRS (Habitat Risk Scoring)**: Advanced multi-parametric prostate MRI analysis platform

Both platforms are available as desktop applications and web-based solutions, targeting medical professionals, researchers, and healthcare institutions.

### Key Features
- **Product Showcase**: Detailed information about RadView and HRS platforms
- **Interactive Documentation**: Comprehensive documentation system with searchable content
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Performance Optimized**: Server-side rendering with Next.js App Router
- **Type-Safe**: Full TypeScript implementation
- **Accessible**: WCAG-compliant design patterns

### Target Audience
- Medical researchers
- Radiologists
- Healthcare institutions
- Software developers working on medical imaging solutions

---

## Architecture & Technology Stack

### Core Technologies

#### Frontend Framework
- **Next.js 15.5.5** (App Router)
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes support
  - Image optimization
  - Font optimization

#### React & TypeScript
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 5**: Full type safety
- **React DOM 19.1.0**: Server and client rendering

#### Styling
- **Tailwind CSS 4**: Utility-first CSS framework
- **Custom CSS Variables**: Theme system with CSS custom properties
- **PostCSS**: CSS processing and optimization
- **Responsive Design**: Mobile-first breakpoints

#### UI Libraries
- **Lucide React 0.545.0**: Icon library (replaces Feather Icons)
- **Framer Motion 12.23.24**: Animation library
- **React Hook Form 7.65.0**: Form handling (for contact/newsletter)

#### Utilities
- **clsx 2.1.1**: Conditional class names
- **tailwind-merge 3.3.1**: Merge Tailwind classes intelligently

### Development Tools
- **Node.js 18+**: Runtime environment
- **npm**: Package manager
- **TypeScript**: Type checking
- **ESLint**: Code linting (if configured)

### Build & Deployment
- **Next.js Build System**: Optimized production builds
- **Turbopack**: Fast development bundler (optional)
- **Vercel**: Recommended deployment platform

---

## Project Structure

```
medical-imaging-solutions/
├── app/                          # Next.js App Router directory
│   ├── layout.tsx               # Root layout with fonts and metadata
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles and CSS variables
│   ├── not-found.tsx            # 404 page
│   │
│   ├── about/                   # About page
│   │   ├── page.tsx
│   │   └── about.css
│   │
│   ├── contact/                 # Contact page
│   │   ├── page.tsx
│   │   └── contact.css
│   │
│   ├── documentation/           # Documentation system
│   │   ├── page.tsx             # Main documentation page (4500+ lines)
│   │   ├── documentation.css    # Documentation-specific styles
│   │   ├── hrs/                 # HRS documentation
│   │   │   └── page.tsx
│   │   ├── radview/             # RadView documentation
│   │   │   └── page.tsx
│   │   └── research-papers/    # Research papers section
│   │       ├── page.tsx
│   │       └── research-papers.css
│   │
│   └── products/                # Product pages
│       ├── hrs/
│       │   └── page.tsx         # HRS product page
│       └── radview/
│           └── page.tsx         # RadView product page
│
├── components/                   # React components
│   ├── layout/                  # Layout components
│   │   ├── header.tsx           # Navigation header
│   │   └── footer.tsx           # Site footer
│   │
│   ├── sections/                 # Page sections
│   │   ├── hero.tsx             # Hero section
│   │   ├── features.tsx         # Features showcase
│   │   ├── product-showcase.tsx # Product cards
│   │   ├── why-choose-us.tsx    # Why choose us section
│   │   ├── testimonials.tsx     # Testimonials
│   │   └── cta.tsx              # Call-to-action
│   │
│   └── ui/                      # Reusable UI components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── textarea.tsx
│
├── lib/                          # Utilities and data
│   ├── constants.ts             # App-wide constants (company info, nav, products)
│   ├── utils.ts                 # Utility functions (cn, etc.)
│   ├── hrs-data.ts              # HRS product data and parameters
│   └── radview-data.ts          # RadView product data
│
├── public/                       # Static assets
│   ├── images/                  # Image assets
│   ├── products/                # Product-specific assets
│   │   ├── *.mp4               # Demo videos
│   │   └── *.png               # Screenshots
│   └── videos/                  # Video assets
│
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── postcss.config.mjs            # PostCSS configuration
├── BUILD_GUIDE.txt               # Quick build instructions
└── README.md                     # Project readme
```

### Key Directories Explained

#### `/app`
Next.js 13+ App Router directory. Each subdirectory represents a route:
- `page.tsx`: Route component
- `layout.tsx`: Layout wrapper (inherited from parent)
- `loading.tsx`: Loading UI (optional)
- `error.tsx`: Error boundary (optional)

#### `/components`
Reusable React components organized by purpose:
- **layout/**: Site-wide layout components
- **sections/**: Page section components
- **ui/**: Atomic UI components

#### `/lib`
Shared utilities and data:
- **constants.ts**: Centralized configuration
- **utils.ts**: Helper functions
- ***-data.ts**: Product-specific data structures

#### `/public`
Static files served at root URL:
- Images, videos, fonts
- Accessible via `/filename.ext`

---

## Key Components

### Layout Components

#### Header (`components/layout/header.tsx`)
**Purpose**: Main navigation header with responsive menu

**Features**:
- Desktop dropdown navigation
- Mobile hamburger menu
- Smooth animations
- Active state management
- Logo with company branding

**Key Props**: None (uses constants from `lib/constants.ts`)

**State Management**:
- `mobileMenuOpen`: Controls mobile menu visibility
- `openDropdown`: Tracks open desktop dropdown
- `mobileOpenDropdown`: Tracks open mobile dropdown

**Usage**:
```tsx
import { Header } from "@/components/layout/header";

// Automatically included in root layout
```

#### Footer (`components/layout/footer.tsx`)
**Purpose**: Site footer with newsletter subscription

**Features**:
- Company information
- Quick links
- Newsletter subscription form
- Client-side form handling

**State Management**:
- `email`: Newsletter email input
- `isSubmitting`: Form submission state
- `message`: Success/error messages

### Section Components

#### Hero (`components/sections/hero.tsx`)
**Purpose**: Homepage hero section with CTA

**Features**:
- Gradient title
- Call-to-action buttons
- Statistics display
- Floating badges
- Video placeholder

**Data Source**: `lib/constants.ts` (COMPANY)

#### Product Showcase (`components/sections/product-showcase.tsx`)
**Purpose**: Display product cards on homepage

**Features**:
- Dynamic product rendering
- Icon mapping
- Feature lists
- Link to product pages

**Data Source**: `lib/constants.ts` (PRODUCTS array)

### Documentation System

#### Documentation Page (`app/documentation/page.tsx`)
**Purpose**: Comprehensive documentation viewer with search and navigation

**Key Features**:
- **Hierarchical Navigation**: Tree structure for RadView and HRS
- **Search Functionality**: Real-time content search
- **Section Management**: Expandable/collapsible sections
- **URL Parameters**: Deep linking to specific sections
- **Responsive Design**: Mobile-friendly interface

**Data Structure**:
```typescript
const documentationStructure = {
  radview: {
    title: "RadView",
    icon: Monitor,
    subsections: {
      desktop: { ... },
      cloud: { ... }
    }
  },
  hrs: { ... }
}
```

**Content Management**:
- Content stored in `contentData` object
- HTML content with rich formatting
- Supports code blocks, lists, tables
- Info boxes and warnings

**Search Implementation**:
- Client-side search across all content
- Highlights matching terms
- Filters sections dynamically

---

## Data Management

### Constants (`lib/constants.ts`)

#### Company Information
```typescript
export const COMPANY = {
  name: "CStride",
  tagline: "Medical Imaging Solutions",
  description: "...",
  email: "dev@cstride.com",
  // ... address, departments, etc.
}
```

#### Navigation Items
```typescript
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    items: [
      { label: "RadView", href: "/products/radview", ... },
      { label: "HRS", href: "/products/hrs", ... }
    ]
  },
  // ...
]
```

#### Products Overview
```typescript
export const PRODUCTS = [
  {
    id: "radview",
    name: "RadView",
    tagline: "...",
    description: "...",
    features: [...],
    // ...
  },
  // ...
]
```

### Product Data

#### RadView Data (`lib/radview-data.ts`)
Comprehensive data structure including:
- Version information
- System requirements
- Module descriptions
- Feature lists
- Workflow steps
- Use cases

**Structure**:
```typescript
export const RADVIEW_DESKTOP = {
  version: "3.4",
  releaseDate: "July 2025",
  hero: { ... },
  overview: { ... },
  modules: [ ... ],
  workflow: { ... },
  useCases: [ ... ]
}
```

#### HRS Data (`lib/hrs-data.ts`)
Includes:
- Product information
- Features and validation
- Analysis components
- Workflow steps
- Platform comparison
- Parameters reference

**Structure**:
```typescript
export const HRS_DATA = {
  name: "HRS - Habitat Risk Scoring",
  features: [ ... ],
  validation: { ... },
  components: [ ... ],
  workflow: [ ... ],
  platforms: [ ... ],
  // ...
}

export const HRS_PARAMETERS = {
  dce: [ ... ],
  adc: [ ... ],
  t2: [ ... ],
  alpha: [ ... ]
}
```

### Utilities (`lib/utils.ts`)

#### Class Name Utility
```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Usage**: Merge Tailwind classes conditionally
```tsx
<div className={cn("base-class", condition && "conditional-class")} />
```

---

## Styling System

### CSS Architecture

#### Global Styles (`app/globals.css`)
**CSS Variables**: Theme system using custom properties
```css
:root {
  --primary: #4F46E5;
  --primary-light: #818CF8;
  --primary-dark: #3730A3;
  --secondary: #06B6D4;
  /* ... more variables ... */
}
```

**Color Palette**:
- **Primary**: Indigo (#4F46E5) - Main brand color
- **Secondary**: Cyan (#06B6D4) - Accent color
- **Accent**: Emerald (#10B981) - Success/CTA color
- **Neutrals**: Gray scale for text and backgrounds

**Typography**:
- **Body Font**: Inter (sans-serif)
- **Heading Font**: Poppins (sans-serif)
- Fonts loaded via `next/font/google` for optimization

**Shadows**: Soft, layered shadows for depth
**Borders**: Light borders for subtle separation

### Tailwind Configuration

#### Theme Extension (`tailwind.config.ts`)
```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "var(--primary)",
        light: "var(--primary-light)",
        dark: "var(--primary-dark)",
      },
      // ...
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Poppins', 'sans-serif'],
    }
  }
}
```

### Component-Specific Styles

#### Page-Level CSS
Each major page has its own CSS file:
- `about.css`: About page styles
- `contact.css`: Contact page styles
- `documentation.css`: Documentation viewer styles
- `research-papers.css`: Research papers styles

**Naming Convention**: BEM-like with prefix
- `medical-*`: Medical theme components
- `hero-*`: Hero section styles
- `product-*`: Product card styles
- `feature-*`: Feature card styles

### Responsive Design

**Breakpoints** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-First Approach**: Base styles for mobile, enhanced for larger screens

---

## Development Workflow

### Prerequisites
- **Node.js**: 18.0.0 or higher
- **npm**: Latest version (comes with Node.js)
- **Git**: For version control (optional)

### Initial Setup

1. **Clone/Navigate to Project**
   ```bash
   cd medical-imaging-solutions
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Server runs on `http://localhost:5000` (default)
   - Uses Turbopack for fast HMR
   - Auto-reloads on file changes

### Available Scripts

```json
{
  "dev": "next dev --turbopack -p 5000",
  "build": "next build",
  "start": "next start"
}
```

**Development** (`npm run dev`):
- Fast refresh enabled
- Source maps for debugging
- Error overlay in browser
- Port 5000 (or next available)

**Build** (`npm run build`):
- Production optimization
- Static page generation
- Code splitting
- Output in `.next/` directory

**Start** (`npm run start`):
- Production server
- Requires `npm run build` first
- Optimized for performance

### Development Best Practices

#### File Organization
- Keep components small and focused
- Use TypeScript for type safety
- Follow existing naming conventions
- Group related files together

#### Component Development
```tsx
// Good: Small, focused component
export function FeatureCard({ title, description }: Props) {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Bad: Large, monolithic component
export function Everything() {
  // 500+ lines of code
}
```

#### TypeScript Usage
```typescript
// Define interfaces for props
interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  features: string[];
  href: string;
}

// Use type inference where appropriate
const products = PRODUCTS; // Type inferred from import
```

#### State Management
- Use React hooks (`useState`, `useEffect`)
- Keep state local when possible
- Lift state only when necessary
- Consider context for global state

### Code Style

#### Naming Conventions
- **Components**: PascalCase (`ProductCard.tsx`)
- **Files**: Match component name
- **Functions**: camelCase (`handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (`NAV_ITEMS`)
- **CSS Classes**: kebab-case with prefix (`medical-nav-link`)

#### Import Organization
```tsx
// 1. React/Next.js imports
import { useState } from "react";
import Link from "next/link";

// 2. Third-party libraries
import { Activity } from "lucide-react";

// 3. Internal components
import { Header } from "@/components/layout/header";

// 4. Utilities and constants
import { COMPANY } from "@/lib/constants";

// 5. Styles
import "./page.css";
```

---

## Deployment

### Build Process

1. **Production Build**
   ```bash
   npm run build
   ```
   - Compiles TypeScript
   - Optimizes images
   - Generates static pages
   - Creates production bundle

2. **Verify Build**
   ```bash
   npm run start
   ```
   - Test production build locally
   - Check for errors
   - Verify all routes work

### Deployment Platforms

#### Vercel (Recommended)
1. Connect GitHub repository
2. Vercel auto-detects Next.js
3. Configure environment variables (if needed)
4. Deploy automatically on push

**Advantages**:
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments for PRs

#### Other Platforms
- **Netlify**: Similar to Vercel
- **AWS Amplify**: AWS integration
- **Docker**: Container deployment
- **Self-hosted**: Node.js server

### Environment Variables

Create `.env.local` for local development:
```env
# Example (if needed)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Note**: Currently, no environment variables are required.

### Production Checklist

- [ ] Run `npm run build` successfully
- [ ] Test all routes
- [ ] Verify images load correctly
- [ ] Check mobile responsiveness
- [ ] Test form submissions
- [ ] Verify SEO metadata
- [ ] Check performance (Lighthouse)
- [ ] Test accessibility (WAVE, axe)

---

## API & Integration Points

### Current State
The application is primarily a **static marketing website** with minimal API requirements.

### Potential Integration Points

#### Contact Form
Currently uses client-side form handling. Could integrate with:
- Email service (SendGrid, Mailgun)
- Form service (Formspree, Netlify Forms)
- Backend API

**Example Integration**:
```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  // Send email or save to database
  return Response.json({ success: true });
}
```

#### Newsletter Subscription
Footer newsletter form could connect to:
- Email marketing service (Mailchimp, ConvertKit)
- Database for email storage
- Backend API endpoint

### Future API Routes

If backend functionality is added:
```
app/api/
├── contact/
│   └── route.ts        # Contact form submission
├── newsletter/
│   └── route.ts        # Newsletter subscription
└── products/
    └── route.ts        # Product data API
```

---

## Best Practices

### Performance Optimization

#### Image Optimization
```tsx
import Image from "next/image";

<Image
  src="/products/radview.png"
  alt="RadView"
  width={800}
  height={600}
  priority // For above-the-fold images
/>
```

#### Code Splitting
- Next.js automatically code-splits by route
- Use dynamic imports for heavy components:
```tsx
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

#### Font Optimization
Fonts loaded via `next/font/google` are automatically optimized:
```tsx
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevents layout shift
});
```

### Accessibility

#### Semantic HTML
```tsx
// Good
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// Bad
<div onClick={handleClick}>Home</div>
```

#### ARIA Labels
```tsx
<button
  aria-label="Toggle mobile menu"
  aria-expanded={isOpen}
>
  <Menu />
</button>
```

#### Keyboard Navigation
- All interactive elements should be keyboard accessible
- Focus states visible
- Tab order logical

### SEO

#### Metadata
Defined in `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "CStride - Medical Imaging Solutions",
  description: "Professional-grade medical imaging software...",
};
```

#### Page-Specific Metadata
```typescript
// app/products/radview/page.tsx
export const metadata = {
  title: "RadView - Radiomics Analysis Platform",
  description: "...",
};
```

### Security

#### Input Validation
```typescript
// Validate email format
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  setMessage("Please enter a valid email address");
  return;
}
```

#### XSS Prevention
- React automatically escapes content
- Use `dangerouslySetInnerHTML` only when necessary
- Sanitize user input

### Code Quality

#### TypeScript
- Enable strict mode
- Use interfaces for props
- Avoid `any` type
- Use type inference where appropriate

#### Component Design
- Single responsibility principle
- Reusable components
- Props interface documentation
- Default props where appropriate

---

## Troubleshooting

### Common Issues

#### Port Already in Use
**Error**: `Port 5000 is already in use`

**Solution**:
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

#### Build Errors

**TypeScript Errors**:
```bash
# Check TypeScript version
npx tsc --version

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Module Not Found**:
- Check import paths (use `@/` alias)
- Verify file exists
- Check `tsconfig.json` paths configuration

#### Styling Issues

**Styles Not Applying**:
- Check CSS file is imported
- Verify Tailwind classes are valid
- Check for CSS specificity conflicts
- Clear browser cache

**CSS Variables Not Working**:
- Verify `:root` definition in `globals.css`
- Check variable names match
- Ensure CSS file is loaded

#### Performance Issues

**Slow Development Server**:
- Use Turbopack: `npm run dev --turbopack`
- Close unnecessary browser tabs
- Check for large files in `public/`

**Large Bundle Size**:
- Use dynamic imports for heavy components
- Optimize images
- Check for unused dependencies

### Debugging Tips

#### React DevTools
- Install React DevTools browser extension
- Inspect component tree
- Check props and state

#### Next.js Debugging
```bash
# Verbose logging
DEBUG=* npm run dev

# Check build output
npm run build
# Review .next/ directory
```

#### Browser DevTools
- Network tab: Check resource loading
- Console: JavaScript errors
- Performance tab: Identify bottlenecks
- Lighthouse: Overall performance audit

### Getting Help

1. **Check Documentation**: Review this file and Next.js docs
2. **Search Issues**: Check for similar problems online
3. **Console Errors**: Read error messages carefully
4. **Minimal Reproduction**: Create small test case
5. **Ask for Help**: Provide error messages and context

---

## Contributing

### Development Setup
1. Fork/clone repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes following code style
4. Test thoroughly
5. Commit with descriptive messages
6. Push and create pull request

### Code Review Checklist
- [ ] TypeScript types defined
- [ ] No console.logs in production code
- [ ] Responsive design tested
- [ ] Accessibility considered
- [ ] Performance impact assessed
- [ ] Documentation updated (if needed)

### Commit Messages
```
feat: Add new product showcase section
fix: Resolve mobile menu animation issue
docs: Update developer documentation
style: Format code with Prettier
refactor: Extract common component logic
```

---

## Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tools
- [Next.js DevTools](https://nextjs.org/docs/app/building-your-application/configuring/devtools)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)

### Design Resources
- [Lucide Icons](https://lucide.dev)
- [Google Fonts](https://fonts.google.com)
- [Color Palette Generator](https://coolors.co)

---

## Version History

### Current Version
- **Next.js**: 15.5.5
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Tailwind CSS**: 4.x

### Changelog
- Initial release with RadView and HRS product pages
- Comprehensive documentation system
- Responsive design implementation
- TypeScript migration
- Performance optimizations

---

## Support & Contact

For technical questions or issues:
- **Email**: dev@cstride.com
- **Documentation**: See `/documentation` route
- **Issues**: Create GitHub issue (if repository is public)

---

**Last Updated**: November 2025
**Maintained By**: CStride Development Team

