# Mashwar

Mashwar is an interactive Arabic-language learning platform that helps beginners explore technology fields, choose a learning path, track their skills, and find learning resources, projects, and career opportunities.

## Features

- Arabic, right-to-left interface with responsive layouts.
- Demo sign-in and local account registration.
- Six learning paths: Front-end Development, Back-end Development, UI/UX Design, Data Analysis, Mobile App Development, and Python.
- Searchable paths, skill completion tracking, and progress indicators.
- Learning resources, projects, and job-search links tailored to the selected path.
- Protected routes powered by React Router.

## Tech Stack

- React 19 and React DOM
- Vite 8
- React Router 7
- JavaScript and CSS
- Web Crypto API for hashing passwords stored by the local demo account flow

## Getting Started

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the development URL printed by Vite, usually `http://localhost:5173`.

### Other Commands

```bash
npm run lint
npm run build
npm run preview
```

## Demo Account

- Email: `demo@mashwar.app`
- Password: `mashwar123`

You can also create an account from the sign-up page. Accounts and learning progress are stored in `localStorage` in the current browser only. This is a front-end demo with no authentication server or database. Do not use a real or reused password.

## Project Structure

```text
src/
  components/   Shared UI components and route guards
  context/      Authentication and learning progress state
  data/         Learning paths and skill data
  layout/       Application shell and navigation
  pages/        Sign-in, dashboard, and application pages
  App.jsx       Route definitions
  styles.css    Responsive application styles
```

## Deployment

### Deploy to Vercel

1. Sign in to [Vercel](https://vercel.com/) using your GitHub account.
2. Select **Add New → Project**, then import `elhamhasan2005/mashwar`.
3. Keep the framework preset as **Vite**. Set the build command to `npm run build` and the output directory to `dist`.
4. Select **Deploy**. Vercel will build the project and provide a public URL.
5. Future pushes to the `main` branch will trigger a new deployment automatically.

The included `vercel.json` sends app routes to the Vite entry point so React Router pages also work when opened or refreshed directly.

No environment variables are required for this demo. Account registration and progress use browser-local storage and are not shared across browsers or devices.

For more information, see [Vercel's Vite guide](https://vercel.com/docs/frameworks/frontend/vite).

## Notes

- Learning resources and career links open third-party websites and may change over time.
- Local account registration is for demonstration only and is not suitable for production or multi-user authentication.
