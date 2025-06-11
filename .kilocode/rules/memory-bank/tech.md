# Technology Stack

## Technologies Used
- **Next.js:** A React framework for server-side rendering (SSR) and static site generation (SSG), used for building the frontend and handling routing, performance optimization, and SEO.
- **React:** The core library for building user interfaces with a component-based architecture.
- **Payload CMS:** A headless content management system integrated for backend content administration, allowing flexible content schema definitions and API access.
- **Tailwind CSS:** A utility-first CSS framework for responsive design and rapid UI development, configured in `tailwind.config.mjs`.
- **TypeScript:** Used for static typing to enhance code reliability and maintainability, as seen in `tsconfig.json`.
- **ESLint:** Configured in `eslint.config.mjs` for code linting and maintaining coding standards.
- **Prettier:** Configured in `.prettierrc.json` for consistent code formatting across the project.
- **Docker:** Utilized for containerization, with configurations in `Dockerfile` and `docker-compose.yml` for reproducible development environments.

## Development Setup
- **Node.js and Yarn:** The project uses Yarn as the package manager, configured in `.yarnrc.yml`, with dependencies managed in `package.json`.
- **Environment Variables:** Defined in `.env.example` for configuration settings like API keys and database connections.
- **Next.js Configuration:** Customized in `next.config.js` for build and runtime settings, including sitemap generation with `next-sitemap.config.cjs`.
- **CSS Handling:** PostCSS is configured in `postcss.config.js` for processing Tailwind CSS and other styles.

## Technical Constraints
- **Performance:** The architecture must support high performance through SSR/SSG to handle dynamic content efficiently.
- **Scalability:** The system is designed to scale with increasing content and user traffic, leveraging Next.js incremental static regeneration.
- **Compatibility:** Ensures compatibility with modern browsers and devices through responsive design with Tailwind CSS.

## Dependencies
- **Core Dependencies:** Include `next`, `react`, `react-dom`, and `payload` as primary libraries for the application framework and CMS.
- **UI Components:** Libraries like `shadcn/ui` for reusable UI elements, as seen in `components.json`.
- **Utilities:** Various utility packages for formatting, data fetching, and state management, listed in `package.json`.

## Tool Usage Patterns
- **Sitemap Generation:** Dynamic sitemap routes in `src/app/(frontend)/(sitemaps)/` for SEO optimization.
- **Internationalization:** Translation files in `src/translations/` for supporting multiple languages (English and Vietnamese).
- **Content Blocks:** Custom blocks in `src/blocks/` for flexible content layouts managed via Payload CMS.
- **Testing and Debugging:** Hooks and utilities in `src/hooks/` and `src/utilities/` for consistent development practices.