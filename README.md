# FlexFits v2.0

A modern, elegant fitness website built with React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

## Features

- **Modern Stack**: React 19, TypeScript, Vite 6, Tailwind CSS v4
- **Beautiful Animations**: Framer Motion for scroll-triggered and interactive animations
- **Component Library**: Radix UI primitives with custom styled components
- **Type Safety**: Full TypeScript with strict mode
- **Performance**: Code splitting, optimized builds, lazy loading
- **Accessibility**: WCAG AA compliant, semantic HTML, keyboard navigation

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the development server at http://localhost:3000

### Build

```bash
npm run build
```

Creates a production build in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Card, Input, etc.)
│   ├── layout/       # Layout components (Navbar, Footer, Layout)
│   └── sections/     # Page sections (Hero, Services, Pricing, etc.)
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and configurations
├── types/            # TypeScript type definitions
├── utils/            # Helper functions
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles with Tailwind v4
```

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript 5.7
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4 + tw-animate-css
- **Animations**: Framer Motion 11
- **UI Primitives**: Radix UI
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Toast**: React Hot Toast
- **Charts**: Recharts
- **Scroll**: React Scroll

## Design System

### Colors

- **Primary**: Orange (#ff6b2b) - Energy, action, fitness
- **Background**: Dark theme optimized
- **Semantic**: Success, warning, destructive variants

### Typography

- **Display**: Space Grotesk - Headlines, numbers
- **Body**: Inter - UI text, content
- **Mono**: JetBrains Mono - Code, technical data

### Spacing

- Base unit: 4px (0.25rem)
- Consistent scale using Tailwind spacing

## Deployment

### Netlify

```bash
npm run build
# Deploy dist/ folder
```

### Vercel

```bash
npm run build
# Deploy dist/ folder
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

## License

MIT License - feel free to use for your own projects!