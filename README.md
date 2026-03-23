# 💓 Pacebeats Landing Page — Modern Running App Showcase

<img src="https://img.shields.io/badge/Astro-Framework-orange?style=flat-square" alt="Astro Framework" /> <img src="https://img.shields.io/badge/TailwindCSS-Styling-blue?style=flat-square" alt="TailwindCSS" /> <img src="https://img.shields.io/badge/TypeScript-Language-blue?style=flat-square" alt="TypeScript" /> <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />

Welcome to the **Pacebeats Landing Page**, a modern, responsive website built with **Astro** and **TailwindCSS** that showcases our smart heart rate monitoring app for runners. This landing page features stunning visuals, smooth animations, and a clean design that converts visitors into users. 🏃‍♂️💓🎯

---

## 🚀 What Is Pacebeats

Pacebeats is a smart heart rate monitoring Android application built with **Kotlin** and **Jetpack Compose** that provides real-time heart rate monitoring and pace tracking for runners. Seamlessly integrated with **Samsung Health SDK**, Pacebeats transforms your Galaxy Watch into a powerful fitness companion.

### This Landing Page Features:

- 🎨 **Modern Design** - Clean, dark theme with vibrant accents
- 📱 **Responsive Layout** - Perfect on all devices and screen sizes
- 🖼️ **Interactive Sections** - Engaging hero sections and feature showcases
- ⚡ **Fast Performance** - Built with Astro for optimal loading speeds
- 🎯 **Conversion Focused** - Strategic CTAs and app download buttons

---

## 📥 How to Clone and Run This Project

### Prerequisites

- **Node.js 18+** and **npm** or **yarn**
- **Git** for version control

### 1. Clone the Repository

```bash
git clone https://github.com/YourUsername/pacebeats-landing.git
cd pacebeats-landing
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Start Development Server

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

The site will be available at `http://localhost:4321` 🎉

### 4. Build for Production

```bash
# Build the site
npm run build

# Preview the build
npm run preview
```

---

## 🧞 Available Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

---

## ⌚ Wear OS Companion Download and Setup

- Wear OS APK (direct download):
  - https://github.com/KpG782/pacebeats-release-files/releases/latest/download/wear-release.apk
- Wear OS APK checksum:
  - https://github.com/KpG782/pacebeats-release-files/releases/latest/download/wear-release.apk.sha256
- Full installation and connection guide:
  - docs/GALAXY_WATCH_INSTALLATION.md

---

## 📂 Project Structure

```text
/
├── public/                     # 🗂️ Static assets
│   ├── favicon.png            # App favicon
│   ├── hero-section.jpg       # Hero background image
│   ├── hero-phone.png         # Phone mockup
│   ├── users.jpg              # User section image
│   ├── wear.jpg               # Watch section background
│   └── pacebeats-text.svg     # Logo text
├── src/
│   ├── components/            # 🧩 Reusable components
│   │   ├── Navbar.astro       # Navigation bar
│   │   ├── Footer.astro       # Footer section
│   │   ├── Features.astro     # Feature cards
│   │   ├── Maps.astro         # Hero content section
│   │   ├── Users.astro        # User showcase
│   │   ├── Wear.astro         # Watch integration
│   │   ├── Words.astro        # Word cloud section
│   │   └── util/
│   │       └── CircleWords.astro  # Reusable word bubbles
│   ├── layouts/
│   │   └── Layout.astro       # Base layout template
│   └── pages/
│       └── index.astro        # Homepage
└── package.json
```

---

## 🎨 Key Sections

### 🏠 **Hero Section**

- Stunning background with running track imagery
- Compelling headline: "From Pavement to Podium"
- Clear call-to-action button
- Responsive design with mobile optimization

### 📱 **App Features**

- 4 feature cards highlighting core functionality:
  - **Precision Pace Tracking** (Featured in red)
  - **Adaptive Training Plans**
  - **Route Discovery**
  - **Community Challenges**

### 👥 **User Showcase**

- "Your Runs. Your Targets. Your Crew." section
- Multiple phone mockups showing app interface
- Community-focused messaging

### ⌚ **Watch Integration**

- "Not Just Your Phone - Wear the Run" section
- Apple Watch mockup with running metrics
- Feature buttons for watch capabilities

### 🎯 **Word Cloud**

- Interactive grid of running-related terms
- "Own the Pace" highlighted prominently
- Scattered layout with hover effects

### 🔗 **Footer**

- Complete site navigation
- Social media links
- App download buttons
- Large brand text overlay

---

## 💡 Design Features

- 🌙 **Dark Theme** - Professional black background with white text
- 🔴 **Red Accents** - Brand color highlighting key elements
- 📱 **Mobile First** - Responsive design starting from mobile
- ⚡ **Fast Loading** - Optimized images and Astro's static generation
- 🎭 **Interactive Elements** - Hover effects and smooth transitions

---

## 🛠️ Tech Stack

**Framework:**

- **Astro** - Modern static site generator
- **TailwindCSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development

**Features:**

- **Component-based Architecture** - Reusable Astro components
- **Static Site Generation** - Fast loading and SEO optimized
- **Responsive Design** - Mobile-first approach
- **Modern CSS** - Grid, Flexbox, and custom properties

---

## 🚀 Deployment

This site is optimized for deployment on:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

```bash
# Build for production
npm run build

# The dist/ folder contains the built site
```

---

## 🔗 Related Projects

- 📱 **Pacebeats Android App** - [Main repository](https://github.com/YourUsername/Pacebeats-Kotlin)
- 🎨 **Design System** - Figma design files
- 📚 **Documentation** - Technical documentation

---

## 👥 Development Team

- 🚀 **Ken Patrick Garcia** — Project Leader & Full-Stack Developer
- 🎨 **Timothy Forte** — UI/UX Designer & Frontend Developer
- 💻 **Brian Ashley Papa** — Backend Developer & Integration Specialist
- 🔧 **Lanz Corpuz** — Mobile Developer & Quality Assurance

---

## 📄 License

```
MIT License

Copyright (c) 2023 Pacebeats Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🔮 Roadmap

- [ ] 🎨 Add animations and micro-interactions
- [ ] 📊 Integrate analytics and conversion tracking
- [ ] 🌐 Multi-language support
- [ ] 📱 Progressive Web App features
- [ ] 🎥 Video testimonials section
- [ ] 📈 A/B testing implementation

---

> Built with 💓 by passionate developers and runners, showcasing the future of smart fitness tracking.

**Made with ❤️ in the Philippines 🇵🇭**

---

## 👀 Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat) for Astro-related questions.
