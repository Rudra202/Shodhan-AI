# Shodhan AI

> **Live Demo:** [🔗 Link will be added here]()

---

## Overview

Shodhan AI is a full-stack SaaS platform for pharmaceutical CRM and business intelligence. It provides 14 integrated modules spanning customer management, sales tracking, AI-powered email assistance, document management, competitive analysis, and a Kanban task board — all wrapped in a modern, responsive UI with dark/light theme support.

---

## Tech Stack

### Frontend

| Layer | Technology |
|-------|-----------|
| Framework | React 19 (RC) + TypeScript |
| Build tool | Vite 6 |
| Routing | React Router v6 |
| State management | Zustand |
| Styling | Tailwind CSS 3 with custom design system |
| Charts | Recharts |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Animations | Custom CSS keyframes |
| Notifications | react-hot-toast |
| Auth | JWT + OAuth (Google, GitHub) |

### Backend

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js + TypeScript (tsx) |
| Framework | Express 4 |
| Database | PostgreSQL (via Prisma ORM) |
| Auth | JWT (jsonwebtoken), Passport (Google OAuth, GitHub OAuth) |
| File storage | Cloudinary |
| Email | Nodemailer |
| Security | Helmet, CORS, rate limiting, bcryptjs |
| Validation | Zod |
| File upload | Multer |

---

## Features

### 14 Pages / Modules

| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | Dashboard | KPI overview, revenue/customer charts, AI activity feed, chat panel |
| `/customers` | Customers | Customer table, country/revenue/retention charts, detail slide-over, filters |
| `/products` | Products | Product cards, sales trend, country demand, AI insights |
| `/sales` | Sales | Sales pipeline, KPI cards, charts (expected mock data) |
| `/emails` | Email AI | AI-assisted email composer and inbox |
| `/knowledge` | Knowledge Base | Documentation and knowledge articles |
| `/ai-chat` | AI Chat | Conversational AI assistant interface |
| `/analytics` | Analytics | Revenue, customer growth, product/employee performance, AI usage |
| `/documents` | Documents | File listing, search, preview panel, **drag-and-drop upload zone** |
| `/meetings` | Meetings | Meeting scheduler and calendar |
| `/tasks` | Tasks | **Kanban board** (To Do / In Progress / Review / Done) with drag-and-drop, create/delete with toast notifications |
| `/competitors` | Competitors | Market share bars, AI capability radar, competitor cards with threat levels |
| `/profile` | Profile | User profile management |
| `/settings` | Settings | Notification toggles, theme switching, sidebar link visibility |

### UX Highlights

- **Responsive design** — desktop sidebar (collapsible), mobile bottom nav, hamburger menu
- **Dark / Light theme** — persisted, toggle in header
- **Global search** — `Cmd+K` palette searches all pages
- **Breadcrumbs** — auto-generated from route path
- **Loading skeletons** — shimmer placeholders on Dashboard and Customers
- **Empty states** — when Customer filters yield no results
- **Toast notifications** — success/error feedback on task create/delete and file upload
- **Pagination** — DataTable paginates at 10 rows per page
- **Keyboard shortcuts** — `Cmd+K` (search), `Escape` (close panels/modals)
- **Focus management** — modal focus trap, ARIA labels, semantic HTML
- **Reduced motion support** — respects `prefers-reduced-motion`
- **Reusable components** — `PageHeader`, `KPIGrid`, `ChartCard`, `DataTable`, `FilterBar`, `ActivityFeed`, `AISuggestions`, `ChatPanel`, `LoadingSkeleton`, `EmptyState`, `Breadcrumbs`, `GlobalSearch`, `BottomNav`
- **Notifications dropdown** — mock notification panel with mark-all-read

### Auth System

- Email/password registration and login
- Forgot / reset password flow
- Email verification
- OAuth: Google and GitHub
- Protected routes with redirect

---

## Project Structure

```
shodhan-project/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── api/               # Axios API client
│   │   ├── components/
│   │   │   └── ui/            # Reusable UI components
│   │   ├── config/            # Sidebar links configuration
│   │   ├── contexts/          # ThemeContext, SidebarContext
│   │   ├── layouts/           # AuthLayout (authenticated), PublicLayout
│   │   ├── pages/             # 14 pages + auth pages + 404
│   │   ├── store/             # Zustand stores (auth, etc.)
│   │   ├── styles/            # Global CSS, Tailwind layers
│   │   ├── types/             # Shared TypeScript types
│   │   ├── App.tsx            # Route definitions
│   │   └── main.tsx           # Entry point with providers
│   ├── tailwind.config.js     # Custom design system tokens
│   └── vite.config.ts         # Dev proxy to backend
│
├── server/                    # Express backend
│   ├── prisma/                # Schema + migrations + seed
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Auth, validation, error handler
│   │   ├── routes/            # Express route definitions
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Helpers (email, tokens, cloudinary)
│   │   └── server.ts          # Entry point
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL database
- Cloudinary account (for file uploads)
- Google OAuth / GitHub OAuth credentials (optional)

### Installation

```bash
# Server
cd server
cp .env.example .env   # Fill in your env vars
npm install
npx prisma db push
npm run dev

# Client
cd client
npm install
npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:5001` (the Express server).

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret |
| `JWT_EXPIRE` | Token expiry (e.g. `7d`) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `SMTP_HOST` / `SMTP_PORT` / etc. | Email transport config |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` (client) | Start Vite dev server on `:5173` |
| `npm run dev` (server) | Start Express with tsx watch on `:5001` |
| `npm run build` (client) | Type-check + production build |
| `npm run preview` (client) | Preview production build |
| `npm run seed` (server) | Seed database with mock data |

---

## Design System

- **Colors** — Custom `primary` (blue) and `surface` (slate/gray) palettes with CSS custom properties
- **Typography** — Inter (sans), JetBrains Mono (mono)
- **Animations** — `fade-in`, `slide-up`, `scale-in`, `slide-in-right`, `slide-in-left`, `glow`, `pulse-soft`
- **Components** — Cards with consistent `border-surface-800` borders, `surface-900` background
- **Dark mode** — Toggled via `html.dark` class, persisted in localStorage
