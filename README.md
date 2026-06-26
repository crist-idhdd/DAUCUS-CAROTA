# What's a Sheep to a Carrot?

### Interactive Companion Web Experience

An immersive, in-universe web application created for the film ***What's a Sheep to a Carrot?*** Designed as a fictional operating system, the experience extends the narrative beyond the screen by allowing users to interact with the world of the film through system terminals, maintenance utilities, compliance checks, and environmental storytelling.

---

## Overview

This project is built as a cinematic web experience rather than a traditional website. Every interaction is designed to feel like accessing an internal computer system belonging to the world of the film.

The interface combines:

* Fictional operating system aesthetics
* Diegetic storytelling
* Interactive system applications
* Atmospheric UI animations
* Hidden narrative elements
* Director controls for live demonstrations and testing

The application serves as both a companion experience and an interactive storytelling platform.

---

## Features

### Launcher Interface

A central hub where users can access different in-universe applications.

### Compliance Module

An interactive compliance system that presents users with narrative-driven choices and evolving system responses.

### Oscilloscope

A visual signal monitoring interface inspired by industrial diagnostic equipment.

### Maintenance Console

A simulated maintenance environment featuring interactive repair sequences and system feedback.

### Daily Check-In

An in-universe personnel check-in system designed to deepen immersion and reinforce the fictional world.

### Director Panel

A hidden control interface used to:

* Trigger overrides
* Test different narrative states
* Demonstrate alternative outcomes
* Control live presentations

### System HUD

Persistent overlays including:

* Console diagnostics
* Ambient scanning lines
* Status indicators
* Background system animations

---

## Tech Stack

* **Next.js 15**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **Radix UI**
* **Firebase**
* **Genkit (Google AI)**
* **Lucide Icons**

---

## Project Structure

```text
src/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── Launcher
│   ├── ConsoleHUD
│   ├── DirectorPanel
│   ├── AnalysisOverlay
│   ├── ResultScreen
│   └── apps/
│       ├── ComplianceApp
│       ├── MaintenanceApp
│       ├── OscilloscopeApp
│       └── DailyCheckInApp
│
└── ui/
```

---

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Install dependencies.

```bash
npm install
```

Create an environment file.

```bash
cp .env.example .env.local
```

Start the development server.

```bash
npm run dev
```

The application will be available at:

```
http://localhost:9002
```

---

## Available Scripts

```bash
npm run dev
```

Runs the application in development mode.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server.

```bash
npm run typecheck
```

Runs the TypeScript compiler.

```bash
npm run lint
```

Runs project linting.

---

## Design Philosophy

Rather than presenting information conventionally, the interface communicates through interaction.

Every visual element—from scanning lines and console diagnostics to simulated system applications—contributes to the illusion that the user is operating a real machine from within the film's universe.

The experience intentionally blurs the line between software and storytelling.

---

## Development Notes

The project follows a modular architecture, allowing each in-universe application to function independently while sharing a common visual language and system framework.

The hidden Director Panel enables rapid testing of narrative states without modifying application logic, making it suitable for demonstrations, exhibitions, and production previews.

---

## Future Improvements

* Expanded narrative pathways
* Additional interactive terminals
* Persistent save states
* Multiplayer or collaborative interactions
* Deeper AI-assisted world simulation
* Enhanced audiovisual environmental effects

---

## License

This project was created exclusively as a companion experience for the film ***What's a Sheep to a Carrot?***

All associated artwork, story elements, interface designs, and intellectual property belong to their respective creators. Redistribution or commercial use without permission is prohibited.
