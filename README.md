# Marketplace Frontend

This is a [Next.js](https://nextjs.org/) project

## Getting Started

First, install dependencies:

```bash
yarn install
```

then, run the development server:

```bash
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Directory structure
```
.
├── /src/
│   ├── /app (router)/
│   │   ├── globals.css (global styles, tailwind config)
│   │   ├── layout.tsx (shared layout between child layouts)
│   │   ├── page.tsx (creates '/' and render 'View')
│   │   └── /childroute/
│   │       ├── layout.tsx (uses parent layout)
│   │       └── page.tsx (creates '/childroute')
│   ├── /components (all components, divided by categories)/
│   │   ├── /Tabs/
│   │   │   ├── component.tsx
│   │   │   ├── component.stories.tsx (storybook component)
│   │   │   └── index.tsx (only exports 'component' for cleaner imports)
│   │   ├── /Buttons
│   │   └── /Icons
│   ├── /context (context providers, useContext())
│   ├── /constants (arbitrary static data) 
│   ├── /hooks (custom hooks)
│   ├── /actions (mutations and server actions, data fetching)
│   ├── /types (any not 'props' related type)
│   └── /templates (divided by specific /route)/
│       ├── /Home (Specific set of components for the /home page)/
│       │   ├── HomeTemplate.tsx
│       │   └── index.tsx (exports homeTemplate)
│       ├── /Collection (same for /collection)
│       └── /AssetView (same for /asset-view)
└── tailwind.config.ts (theme and compiler tailwind config)
```