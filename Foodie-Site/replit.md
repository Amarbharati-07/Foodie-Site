# Shri Krishna Restaurant Website

## Overview

A premium restaurant website for Shri Krishna Restaurant, a pure vegetarian restaurant located in Ambernath, Thane. The site showcases the restaurant's menu with image-based cards, provides information about the establishment, displays a photo gallery, and includes a contact form. The design emphasizes a premium, elegant aesthetic with gold/amber theming and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for page transitions and scroll effects
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in shared routes
- **Build System**: Custom build script using esbuild for server, Vite for client

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Tables**: categories, menuItems, contactMessages

### Key Design Patterns
- **Monorepo Structure**: Client, server, and shared code in single repository
- **Shared Types**: Schema and route definitions shared between frontend and backend
- **API Route Definition**: Centralized in `shared/routes.ts` with Zod schemas for validation
- **Path Aliases**: `@/` for client source, `@shared/` for shared code

### Project Structure
```
Foodie-Site/
├── client/           # React frontend
│   └── src/
│       ├── components/  # UI components including shadcn/ui
│       ├── pages/       # Route pages (Home, Menu, About, Gallery, Contact)
│       ├── hooks/       # Custom hooks including data fetching
│       └── lib/         # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database operations
│   └── db.ts         # Database connection
├── shared/           # Shared between client and server
│   ├── schema.ts     # Drizzle table definitions
│   └── routes.ts     # API route contracts
└── migrations/       # Drizzle migrations
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage for Express

### Frontend Libraries
- **@tanstack/react-query**: Data fetching and caching
- **framer-motion**: Animation library
- **lucide-react**: Icon library
- **embla-carousel-react**: Carousel component
- **react-day-picker**: Calendar component
- **react-hook-form**: Form management
- **zod**: Runtime type validation

### Backend Libraries
- **drizzle-orm**: Database ORM
- **drizzle-zod**: Schema to Zod type generation
- **express-session**: Session management
- **express-rate-limit**: API rate limiting

### Build Tools
- **Vite**: Frontend bundler with HMR
- **esbuild**: Server bundler for production
- **drizzle-kit**: Database migration tool

### Development Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run db:push`: Push schema changes to database