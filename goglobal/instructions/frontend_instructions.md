# Project Overivew
Use this guide to build a web app where companies can register their product, chat with differnt AI agents which are global
agents(which are experts in their own domain), and users can use these agents to get the information they get

# Feature requirements
- We will use Next.js, Shadcn, Lucid, Supabase, Clerk

- landing page instruction
    - Create a simple landing page for the product, which is just a intro page about the product
    - the landing page should contain the product logo for now a place holder can be used.
    - the landing page should contain a nav bar with following tabs Agents, Docs, Pricing.
    - generate some contain related to the product, and then create a template footer for now
    - instructions to be added

# Relevant docs

# Current File Structure
goglobal/
├── .next/
│   ├── app/
│   │   ├── fonts/
│   │   └── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── input.tsx
│       └── label.tsx
├── lib/
│   └── utils.ts
├── node_modules/
├── instructions/
│   └── frontend_instructions.md
|   └── layout
|       └── ....
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

README.md (outside)

## Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified
- All new pages go in /app