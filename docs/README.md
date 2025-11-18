# Client Components

This directory contains React/TSX client components that use Framer Motion and Lucide icons.

## Components

### HeroClient.tsx

- Main hero section with animated headline, CTA button, and phone mockup
- Uses Framer Motion for entrance animations and interactions
- Lucide icons: Rocket, ChevronDown

## Usage

Import these components in Astro files with the `client:load` directive:

```astro
---
import HeroClient from './client/HeroClient';
---

<HeroClient client:load />
```

## Technologies

- React 19
- Framer Motion (motion/react)
- Lucide React Icons
- TypeScript
