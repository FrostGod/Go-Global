# Project Overivew
Use this guide to build a web app where companies can register their product, chat with differnt AI agents which are global
agents(which are experts in their own domain), and users can use these agents to get the information they get

# Feature requirements
- We will use Next.js, Shadcn, Lucid, Supabase, Clerk

- landing page instruction
    - Create a simple landing page for the product, which is just a intro page about the product
    - the landing page should contain the product logo for now a place holder can be used.
    - the landing page should contain a nav bar with following tabs Agents, Expo, Pricing.
    - generate some contain related to the product, and then create a template footer for now
    - lets add logo
    - lets add the clerk user signup functionality
- Expo page
  - This is a table where companies list themselves and put where they want to expand their business
  - it contains the following columns
    Company_ID – A unique identifier for each company.
    Logo – The company's logo or brand image.
    Company_Name – The name of the company.
    Company_Description – A brief description of what the company does.
    Expansion_Locations – Locations where the company plans to expand.
    Objective – What the company is looking for in terms of resources, such as advertisers, legal consultancies, local talent agencies, etc.
    Potential_Partners – List of specific entities or types of companies (e.g., advertisers, legal consultancies, local talent agencies) the company seeks to partner with.
  - the data will be fetched from the supabase

# Relevant docs
## Clerk Documentation

middleware.ts

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

/src/app/layout.tsx to app router
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

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