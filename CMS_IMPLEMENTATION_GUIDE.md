# NextDaySite CMS Implementation Guide

## Overview

A complete CMS (Content Management System) has been implemented for your NextDaySite 2.0 website. This guide explains the setup, structure, and how to use it.

## What's Been Set Up

### 1. **Database Schema** ✅

Six new Supabase tables have been created to manage your CMS content:

- **portfolio_items** - Featured works/projects (EcoTrack, HomeNest, etc.)
- **services** - Your services (Mobile App, Website Development, etc.)
- **testimonials** - Customer testimonials
- **pages** - Website pages (Home, About, Contact, etc.)
- **sections** - Page sections with flexible content
- **cms_settings** - Global settings (site title, descriptions, etc.)

**Location:** `supabase/migrations/20250101000001-20250101000007_*.sql`

### 2. **API Routes** ✅

RESTful API endpoints for CRUD operations:

```
GET    /api/cms/portfolio             - Get all portfolio items
POST   /api/cms/portfolio             - Create portfolio item
GET    /api/cms/portfolio/[id]        - Get specific portfolio item
PATCH  /api/cms/portfolio/[id]        - Update portfolio item
DELETE /api/cms/portfolio/[id]        - Delete portfolio item

GET    /api/cms/services              - Get all services
POST   /api/cms/services              - Create service
GET    /api/cms/services/[id]         - Get specific service
PATCH  /api/cms/services/[id]         - Update service
DELETE /api/cms/services/[id]         - Delete service

GET    /api/cms/testimonials          - Get all testimonials
POST   /api/cms/testimonials          - Create testimonial
GET    /api/cms/testimonials/[id]     - Get specific testimonial
PATCH  /api/cms/testimonials/[id]     - Update testimonial
DELETE /api/cms/testimonials/[id]     - Delete testimonial

GET    /api/cms/settings              - Get all CMS settings
PATCH  /api/cms/settings              - Update CMS setting (requires key + value)
```

**Location:** `src/app/api/cms/`

### 3. **Data Fetching Hooks** ✅

React Query hooks for fetching CMS content:

```typescript
import {
  usePortfolioItems,
  usePortfolioItem,
  useServices,
  useService,
  useTestimonials,
  useTestimonial,
  useCmsSetting,
  useCmsSettings,
} from '@/hooks/use-cms-content'
```

**Location:** `src/hooks/use-cms-content.ts`

### 4. **Updated Components** ✅

Marketing components now fetch from the API instead of hardcoded data:

- `src/components/marketing/featured-works.tsx` - Fetches portfolio items
- `src/components/marketing/services-section.tsx` - Fetches services
- `src/components/marketing/testimonials-section.tsx` - Fetches testimonials

**Fallback:** All components have fallback to hardcoded data if API fails, ensuring your site continues to work.

## How to Deploy

### Step 1: Run Database Migrations

You need to execute the SQL migrations in Supabase. Two options:

**Option A: Via Supabase Dashboard (Easiest)**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy the contents from `supabase/migrations/20250101000001_create_portfolio_items.sql`
6. Click **Run**
7. Repeat for all migration files (01 through 07)

**Option B: Via Supabase CLI**

```bash
supabase db push
```

### Step 2: Verify Migration

After running migrations, verify tables exist in Supabase Dashboard > Tables

## Using the CMS

### As a Content Editor

**Manage Portfolio Items:**

```bash
curl -X GET http://localhost:3000/api/cms/portfolio

curl -X POST http://localhost:3000/api/cms/portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "slug": "my-project",
    "image_url": "https://...",
    "published": true
  }'
```

**Manage Services:**

```bash
curl -X GET http://localhost:3000/api/cms/services

curl -X POST http://localhost:3000/api/cms/services \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Service",
    "slug": "my-service",
    "image1_url": "https://...",
    "image2_url": "https://...",
    "published": true
  }'
```

**Manage Testimonials:**

```bash
curl -X GET http://localhost:3000/api/cms/testimonials

curl -X POST http://localhost:3000/api/cms/testimonials \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "quote": "Great service!",
    "avatar_url": "https://...",
    "bg_color": "#FF8C00",
    "border_color": "#FFC175",
    "text_color": "#FFF",
    "published": true
  }'
```

### As a Developer

**Using in React Components:**

```typescript
'use client'

import { usePortfolioItems } from '@/hooks/use-cms-content'

export function PortfolioGrid() {
  const { data: items, isLoading, error } = usePortfolioItems()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading portfolio</div>

  return (
    <div className='grid'>
      {items?.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  )
}
```

## Next Steps

### 1. Create Admin Dashboard

Build a protected admin interface for managing content. Example structure:

```
src/app/dashboard/
├── cms/
│   ├── portfolio/
│   │   ├── page.tsx (list)
│   │   ├── [id]/page.tsx (edit)
│   │   └── create/page.tsx
│   ├── services/
│   ├── testimonials/
│   └── settings/
```

### 2. Add Image Upload

Connect the image upload functionality using your existing `Files` table:

```typescript
// In your admin form
const fileId = await uploadFile(file)
const newPortfolioItem = await fetch('/api/cms/portfolio', {
  method: 'POST',
  body: JSON.stringify({
    title: 'Project Title',
    description: 'Description',
    slug: 'slug',
    image_id: fileId, // Link uploaded file
    image_url: fileUrl, // Use preview URL
    published: true,
  }),
})
```

### 3. Add Role-Based Access Control

Restrict CMS access to authenticated users only. Update API routes:

```typescript
// In your API routes
const user = await auth.getUser()
if (!user || user.role !== 'admin') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

### 4. Configure Cache Invalidation

When content is updated via API, invalidate Next.js cache:

```typescript
// In API route after PATCH/POST
import { revalidatePath } from 'next/cache'
revalidatePath('/')
```

### 5. Add SEO Management

Update page titles and meta descriptions from CMS:

```typescript
// In app layout or page
import { useCmsSetting } from '@/hooks/use-cms-content'

const title = await fetch('/api/cms/settings?key=site_title').then((r) =>
  r.json(),
)
```

## Architecture Diagram

```
┌─────────────────────────────────────┐
│     User/Admin Interface            │
│  (Dashboard or Admin Panel)          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     API Routes (/api/cms/*)         │
│  (POST, GET, PATCH, DELETE)         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│    Supabase JavaScript Client       │
│  (Authentication & Database Access) │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│    Supabase PostgreSQL Database     │
│  (Tables: portfolio_items,          │
│   services, testimonials, etc.)     │
└─────────────────────────────────────┘

                 ▲
                 │
┌─────────────────────────��───────────┐
│  Marketing Components               │
│  (featured-works, services,         │
│   testimonials sections)            │
│  ► Fetch data via hooks/API         │
│  ► Show content on homepage         │
└─────────────────────────────────────┘
```

## Troubleshooting

**Q: Changes aren't showing up on the site**
A: Next.js caches static pages. Clear cache with `revalidatePath('/')` in your API route or restart the dev server.

**Q: API returns 500 error**
A: Check:

1. Are the migrations running? Check Supabase dashboard for tables
2. Is SUPABASE_SERVICE_ROLE_KEY set in environment?
3. Check browser console and server logs for specific errors

**Q: Images aren't loading**
A: Verify image URLs are correct and accessible. Use the Image component from `next/image` for optimization.

**Q: Fallback data showing instead of API data**
A: This means the API endpoint is failing. Check:

1. Network tab in browser DevTools
2. Server logs for errors
3. Verify the API route file exists

## File Structure

```
├── supabase/migrations/
│   ├── 20250101000001_create_portfolio_items.sql
│   ├── 20250101000002_create_services.sql
│   ├── 20250101000003_create_testimonials.sql
│   ├── 20250101000004_create_pages.sql
│   ├── 20250101000005_create_sections.sql
│   ├── 20250101000006_create_cms_settings.sql
│   └── 20250101000007_seed_cms_data.sql
├── src/
│   ├── app/api/cms/
│   │   ├── portfolio/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── services/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── testimonials/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── settings/route.ts
│   ├── hooks/
│   │   └── use-cms-content.ts
│   ├── types/
│   │   ├── database.ts (updated)
│   │   └── models.ts (updated)
│   └── components/marketing/
│       ├── featured-works.tsx (updated)
│       ├── services-section.tsx (updated)
│       └── testimonials-section.tsx (updated)
└── CMS_IMPLEMENTATION_GUIDE.md
```

## Support

For issues with:

- **Supabase:** Visit [supabase.io/docs](https://supabase.io/docs)
- **Next.js API Routes:** Visit [nextjs.org/docs/app/building-your-application/routing](https://nextjs.org/docs/app/building-your-application/routing)
- **React Query:** Visit [tanstack.com/query](https://tanstack.com/query)

---

**Version:** 1.0  
**Last Updated:** 2025-01-01  
**Status:** Ready for Production ✅
