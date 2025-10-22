# portfolio-frontend

A modern, responsive frontend for a personal portfolio. Built to showcase projects, resume, and contact information with a focus on performance and accessibility.

## Features
- Responsive layout for desktop and mobile
- Project gallery with links and descriptions
- Blog / posts list (optional)
- Contact form (supports email or third-party form handlers)
- Theme support (light/dark)
- Easy deployment to Vercel, Netlify, or GitHub Pages

## Tech stack
- Framework: React 
- Bundler: Vite 
- Styling: Tailwind CSS / CSS Modules / Styled Components
- Optional: TypeScript

## Getting started

1. Clone the repo
```bash
git clone <repository-url>
cd portfolio-frontend
```

2. Install dependencies
```bash
npm install
# or
yarn
# or
pnpm install
```

3. Development
```bash
npm run dev
# or
npm start
```

4. Build for production
```bash
npm run build
```

5. Serve the production build locally
```bash
npm run serve
# (or use a static server like `serve` or `http-server`)
```

## Environment
Create a `.env` file in the project root for any environment variables:
```
VITE_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=443
```
Adjust variable names to match your framework/tooling conventions.

## Deployment
- Vercel: connect the repo, set build command and output directory (e.g., `npm run build` and `dist` or `build`).
- Netlify: connect repo and configure build settings.
- GitHub Pages: use `gh-pages` or build artifacts to the `gh-pages` branch.

## Project structure (example)
```
└── 📁portfolio-frontend
    └── 📁public
        └── 📁social-logo
            ├── github.png
            ├── linkedin.png
            ├── x.png
    └── 📁src
        └── 📁api
            ├── client.ts
        └── 📁components
            └── 📁ui
                ├── badge.tsx
                ├── button.tsx
                ├── card.tsx
                ├── custom.tsx
                ├── input.tsx
                ├── label.tsx
                ├── progress.tsx
                ├── sonner.tsx
                ├── textarea.tsx
            ├── About.tsx
            ├── Contact.tsx
            ├── Footer.tsx
            ├── Header.tsx
            ├── Hero.tsx
            ├── Projects.tsx
            ├── Skills.tsx
        └── 📁constants
            ├── socialLogos.ts
        └── 📁hooks
            └── 📁mutations
                ├── useContactForm.ts
            ├── use-toast.ts
            ├── useApi.ts
            ├── useDeveloperInfo.ts
            ├── useExperiences.ts
            ├── useProjects.ts
            ├── useSkills.ts
            ├── useTestimonials.ts
        └── 📁lib
            ├── utils.ts
        └── 📁types
            ├── index.ts
        └── 📁utils
            ├── formatMetric.ts
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── vite-env.d.ts
    ├── .env
    ├── .gitignore
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

## Contributing
- Fork the repo, create a feature branch, and open a PR.
- Keep changes focused and add notes to the PR about any new setup steps.

## License
MIT license.
