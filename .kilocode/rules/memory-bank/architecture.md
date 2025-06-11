# System Architecture

## Overview
The project is built using Next.js, a React framework for server-side rendering and static site generation, integrated with Payload CMS for content management. This architecture supports dynamic content delivery, scalability, and ease of administration.

## Source Code Paths
- **Frontend Pages:** Located in `src/app/(frontend)/` - Includes routes for Home, About, Blog, Projects, Services, and Contact.
- **Backend CMS:** Located in `src/app/(payload)/` - Admin interface and API endpoints for Payload CMS.
- **Collections:** Defined in `src/collections/` - Configurations for content types like Pages, Posts, Projects, and Users.
- **Components:** Found in `src/components/` - Reusable UI elements for layout, media, and rich text rendering.
- **Blocks:** Located in `src/blocks/` - Custom content blocks for flexible page layouts (e.g., Banner, CallToAction, MediaBlock).
- **Utilities:** In `src/utilities/` - Helper functions for data fetching, formatting, and URL generation.

## Key Technical Decisions
- **Next.js for Frontend:** Chosen for its hybrid rendering capabilities (SSR/SSG), which improve performance and SEO.
- **Payload CMS for Backend:** Selected for its flexibility in defining content schemas and its seamless integration with Next.js.
- **Tailwind CSS:** Used for responsive design and rapid UI development.
- **Internationalization:** Implemented with translation files in `src/translations/` for English and Vietnamese.
- **SEO Optimization:** Achieved through dynamic sitemap generation and metadata handling in frontend routes.

## Design Patterns in Use
- **Component-Based Architecture:** UI is broken into reusable components for maintainability.
- **Server-Side Rendering (SSR) and Static Site Generation (SSG):** Used for performance optimization and SEO.
- **Hooks:** Custom hooks in `src/hooks/` for state management and side effects (e.g., `useDebounce`, `useMobile`).
- **Modular Content Blocks:** Allows for flexible page composition through Payload CMS.

## Component Relationships
- **Header and Footer:** Managed as global components in `src/Header/` and `src/Footer/`, rendered across all frontend pages.
- **Content Blocks:** Dynamically rendered via `RenderBlocks.tsx` based on CMS data.
- **Hero Components:** Different impact levels (High, Medium, Low) defined in `src/heros/` for varied page introductions.
- **Media Handling:** Centralized in `src/components/Media/` for consistent image and video rendering.

## Critical Implementation Paths
- **Content Fetching:** API routes in `src/app/(payload)/api/` interact with Payload CMS to retrieve content for frontend rendering.
- **Dynamic Routing:** Implemented in `src/app/(frontend)/[slug]/` and `src/app/(frontend)/posts/[slug]/` for custom page URLs.
- **Form Handling:** Custom form blocks in `src/blocks/Form/` for user input and submissions (e.g., contact forms).
- **SEO and Accessibility:** Metadata and sitemap generation in frontend routes ensure visibility and usability.