import { projectCover } from "./project-covers";

export type ProjectStatus =
  | "IN_DEVELOPMENT"
  | "TEST"
  | "PRODUCTION"
  | "UNKNOWN";

export type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  problem: string | null;
  solution: string | null;
  status: ProjectStatus;
  category: { name: string; slug: string };
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  appUrl: string | null;
  featured: boolean;
  coverImage: string | null;
  source: "verified-github-snapshot" | "database";
  updatedAt?: string;
};

const projectSnapshot: PortfolioProject[] = [
  {
    id: "verified-mmc-go-drivers",
    title: "MMC Go Drivers",
    slug: "mmc-go-drivers",
    shortDescription:
      "A mobile app for drivers, trip planning, and fleet management.",
    description:
      "MMC Go Drivers brings together vehicle-friendly navigation, trip and schedule management, and fleet administration tools. This description is based on the public repository README.",
    problem:
      "Drivers and small transport businesses need navigation, planning, and documents in one place.",
    solution:
      "The app offers dedicated tools for bus, taxi, and truck drivers, alongside fleet management features for businesses.",
    status: "UNKNOWN",
    category: { name: "Mobile app", slug: "mobile" },
    technologies: ["Flutter", "Dart", "PostgreSQL"],
    githubUrl: "https://github.com/Manidoux41/mmc-go-drivers",
    liveUrl: "https://mmcgodrivers-website.vercel.app/",
    appUrl: null,
    featured: true,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-la-voix-des-enfants",
    title: "La Voix des Enfants Placés — Vienne",
    slug: "la-voix-des-enfants-places",
    shortDescription:
      "A responsive editorial website for an organization focused on child protection.",
    description:
      "The repository describes a public site with information pages and news managed with Prisma and PostgreSQL. It also includes a private area for managing articles. The organization must validate its content and contact details before publication.",
    problem:
      "Make the organization's information accessible and let its team publish news without changing code.",
    solution:
      "A responsive editorial interface connected to a database, with private article management and a contact form.",
    status: "UNKNOWN",
    category: { name: "Website", slug: "web" },
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/Manidoux41/lavoixdesenfants",
    liveUrl: "https://la-voix-des-enfants-places-vienne.vercel.app/",
    appUrl: null,
    featured: true,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-saiway",
    title: "Saiway — Siem Reap Airport Transfers",
    slug: "saiway",
    shortDescription:
      "A booking and operations platform for private airport transfers in Siem Reap.",
    description:
      "Saiway is an airport transfer service with booking workflows and operational tools for customers, drivers, and administrators. Its README documents role-based booking and trip management backed by PostgreSQL.",
    problem:
      "Coordinate airport journeys and day-to-day operations across customers, drivers, and administrators.",
    solution:
      "One platform brings together booking workflows, trip assignments, and role-specific tools.",
    status: "UNKNOWN",
    category: { name: "Airport transfers", slug: "transfers" },
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/Manidoux41/saiway",
    liveUrl: "https://gestion-planning-91ve.vercel.app",
    appUrl: null,
    featured: true,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-khmera",
    title: "KHMERA — Siem Reap Relocation & Travel",
    slug: "khmera",
    shortDescription:
      "Personalized guidance for newcomers, entrepreneurs, and travelers planning a stay in Siem Reap.",
    description:
      "KHMERA presents local information and quote-based services for relocation, business projects, and discovery trips in Siem Reap. The public website is available in English, French, Spanish, and German.",
    problem:
      "People preparing to move, start a business, or explore Siem Reap need clear, locally grounded guidance.",
    solution:
      "A multilingual information site introduces services and helps visitors prepare a request. Offers are informational; online booking and payment are not active.",
    status: "UNKNOWN",
    category: { name: "Relocation & travel", slug: "travel" },
    technologies: ["Next.js", "TypeScript"],
    githubUrl: "https://github.com/Manidoux41/khmera",
    liveUrl: "https://khmera.vercel.app",
    appUrl: null,
    featured: true,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-voix-et-enfance",
    title: "Voix & Enfance — Civic Initiative",
    slug: "voix-et-enfance",
    shortDescription:
      "A public information site with a proposal page and ways to support an initiative.",
    description:
      "The public Next.js application links visitors to an initiative proposal and a signature flow. The summary is based on the published page structure and package manifest; the initiative’s wording and publication details should be validated before reuse.",
    problem:
      "Make an initiative’s proposal and ways to support it accessible online.",
    solution:
      "A public site presents information and directs visitors to proposal and signature pages without implying institutional endorsement.",
    status: "UNKNOWN",
    category: { name: "Civic platforms", slug: "civic" },
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "Zod"],
    githubUrl: "https://github.com/Manidoux41/voix-et-enfance",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-cv-builder-app",
    title: "CV Studio — CV Builder",
    slug: "cv-builder-app",
    shortDescription:
      "A CV editor with live preview, customizable layouts, and browser-based PDF export.",
    description:
      "CV Studio is a Next.js résumé builder with editable profile, experience, education, projects, and skills. Its README documents a live preview and print-to-PDF workflow; local drafts can use SQLite through Prisma. Production storage and multi-user access are not claimed.",
    problem:
      "Create and refine a résumé without manually laying out every section.",
    solution:
      "An editable form and preview support two layouts, styling choices, and browser-based A4 printing or PDF export.",
    status: "IN_DEVELOPMENT",
    category: { name: "Digital tools", slug: "tools" },
    technologies: ["Next.js", "React", "TypeScript", "Prisma", "SQLite"],
    githubUrl: "https://github.com/Manidoux41/cv-builder-app",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-association-declaration",
    title: "Association Declaration Helper",
    slug: "association-declaration",
    shortDescription:
      "A browser-based helper for preparing and exporting event declaration documents.",
    description:
      "This standalone web tool guides users through a public-event declaration, generates a preview, and supports TXT/JSON export or browser printing to PDF. Drafts remain in local browser storage; it does not submit documents to a town hall or prefecture.",
    problem:
      "Organize the information needed to prepare a public-event declaration.",
    solution:
      "A guided form, local drafts, and export options help prepare a document for manual review and submission.",
    status: "TEST",
    category: { name: "Civic platforms", slug: "civic" },
    technologies: ["HTML", "CSS", "JavaScript", "localStorage"],
    githubUrl: "https://github.com/Manidoux41/association-declaration",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-gestion-planning",
    title: "Maison douce — Daily Planning Prototype",
    slug: "gestion-planning",
    shortDescription:
      "A mobile-first dashboard concept for daily family routines, hours, and upcoming tasks.",
    description:
      "The repository README describes an early responsive dashboard for following a family-care day, monthly hours, and upcoming tasks. It explicitly identifies its data as local demonstration data, with persistent business workflows planned for later.",
    problem:
      "Bring daily care routines, working hours, and upcoming tasks into one overview.",
    solution:
      "A mobile-first dashboard presents daily and monthly information using demonstration data.",
    status: "TEST",
    category: { name: "Digital tools", slug: "tools" },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Manidoux41/gestion_planning",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-nos-liens-nos-enfants",
    title: "Nos liens, nos enfants — Civic Platform",
    slug: "nos-liens-nos-enfants-contre-l-ase",
    shortDescription:
      "An information and participation site with cited resources, a moderated survey, and petition preparation.",
    description:
      "The repository README describes an anonymized family account, sourced information, a moderated public survey, aggregate statistics, and a petition-preparation flow. Its stack uses Next.js, React, PostgreSQL, and Prisma. This summary avoids repeating personal or sensitive details from the source material.",
    problem:
      "Present sourced information and provide structured ways for visitors to participate.",
    solution:
      "A public site combines editorial resources, survey participation, moderated statistics, and petition preparation.",
    status: "IN_DEVELOPMENT",
    category: { name: "Civic platforms", slug: "civic" },
    technologies: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL"],
    githubUrl:
      "https://github.com/Manidoux41/nos-liens-nos-enfants-contre-l-ase",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-cv-international-manfred",
    title: "International CV Collection",
    slug: "cv-international-manfred",
    shortDescription:
      "A collection of role-specific CV documents and static HTML résumé pages.",
    description:
      "This repository contains international and role-specific résumé material in HTML and PDF formats. It is presented as a professional document collection rather than a web application; no deployment or document freshness is implied.",
    problem:
      "Keep résumé variants and presentation formats organized in one public repository.",
    solution:
      "Static HTML pages and PDF documents provide several résumé formats for different professional contexts.",
    status: "UNKNOWN",
    category: { name: "Professional profiles", slug: "professional" },
    technologies: ["HTML", "CSS"],
    githubUrl: "https://github.com/Manidoux41/cv-international-manfred",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-mmcgodrivers-website",
    title: "MMC Go Drivers — Public Website",
    slug: "mmcgodrivers-website",
    shortDescription:
      "The companion information website for the MMC Go Drivers mobile service.",
    description:
      "The public website presents MMC Go Drivers features, pricing, reviews, and service information. Its Next.js source includes Supabase-backed content and a Resend dependency; it is listed separately from the Flutter mobile application because it has its own public repository.",
    problem:
      "Explain the mobile service and its plans through a public web presence.",
    solution:
      "A dedicated website presents product information and related public pages alongside the separate mobile-app repository.",
    status: "UNKNOWN",
    category: { name: "Website", slug: "web" },
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "Resend"],
    githubUrl: "https://github.com/Manidoux41/mmcgodrivers-website",
    liveUrl: "https://mmcgodrivers-website.vercel.app/",
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-tuktukgo",
    title: "Angkor Move (TukTukGo) — Mobility Prototype",
    slug: "tuktukgo",
    shortDescription:
      "A mobile mobility-service prototype for drivers, passengers, hotels, and transport businesses.",
    description:
      "The README describes an Expo/React Native prototype with role-oriented onboarding and dashboard foundations. It presents booking, trip operations, and business workflows as a product direction; this portfolio does not claim that a production booking service is live.",
    problem:
      "Explore a mobile foundation for coordinating local mobility roles and services.",
    solution:
      "A prototype organizes role-specific entry points and dashboard foundations while the README places core booking workflows on the roadmap.",
    status: "IN_DEVELOPMENT",
    category: { name: "Transport", slug: "transport" },
    technologies: ["Expo", "React Native", "TypeScript", "Supabase", "Zustand"],
    githubUrl: "https://github.com/Manidoux41/tuktukgo",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-test-vs-2",
    title: "TechBoutik — E-commerce Demo (Fork)",
    slug: "test-vs-2",
    shortDescription:
      "A clearly labeled fork of an e-commerce demonstration application.",
    description:
      "This repository is a fork of michaelbaze1987-cloud/test-vs-2. Its README describes a demo storefront with a product catalogue, cart, order views, and simulated checkout; demo data is stored in memory/local files and real payments are not enabled. It is not presented as an original production commerce platform.",
    problem:
      "Explore storefront and administration flows in a demonstration e-commerce application.",
    solution:
      "The fork provides catalogue, cart, simulated checkout, and admin-oriented screens for experimentation.",
    status: "TEST",
    category: { name: "Experiments & tutorials", slug: "learning" },
    technologies: ["Next.js", "React", "TypeScript", "Prisma", "Zod"],
    githubUrl: "https://github.com/Manidoux41/test-vs-2",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-testapprn",
    title: "Route & Schedule Toolkit — Test App",
    slug: "testapprn",
    shortDescription:
      "An experimental driver-workflow app with route-planning and schedule screens.",
    description:
      "The Expo source includes a GPS route-planning screen with KML/GPX helpers and a schedule screen that extracts information from PDF files. The repository has no README, so this is deliberately labeled as a test app and no production status or backend is claimed.",
    problem:
      "Experiment with route and schedule workflows in a mobile application.",
    solution:
      "The source contains separate screens for route planning and PDF-based schedule handling.",
    status: "TEST",
    category: { name: "Experiments & tutorials", slug: "learning" },
    technologies: ["Expo", "React Native", "TypeScript", "Expo Location"],
    githubUrl: "https://github.com/Manidoux41/testapprn",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-flutter-first-app",
    title: "Flutter First App — Tutorial Starter",
    slug: "flutter-first-app",
    shortDescription:
      "The default Flutter starter project, retained as a learning exercise.",
    description:
      "The repository README identifies this as a new Flutter project and links to the official first-app lab. Its pubspec contains Flutter and the standard Cupertino Icons dependency; it is intentionally labeled as a tutorial starter, not a released product.",
    problem: null,
    solution: null,
    status: "TEST",
    category: { name: "Experiments & tutorials", slug: "learning" },
    technologies: ["Flutter", "Dart"],
    githubUrl: "https://github.com/Manidoux41/flutter_first_app",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-frontend2-simplon-best",
    title: "Cars Simplon — Driver Mission Client",
    slug: "frontend2-simplon-best",
    shortDescription:
      "A mobile client for drivers and administrators to review missions, vehicles, and team activity.",
    description:
      "The README describes a coach-driver mission app, and the inspected Expo source shows dashboard requests for missions, vehicles, and driver data through an API service. It is treated as a mobile client prototype; the README and manifest differ slightly on the Expo version.",
    problem:
      "Give drivers and administrators a mobile view of mission and fleet information.",
    solution:
      "A role-aware mobile client organizes dashboard, mission, vehicle, and driver views.",
    status: "IN_DEVELOPMENT",
    category: { name: "Transport", slug: "transport" },
    technologies: ["Expo", "React Native", "TypeScript", "Axios"],
    githubUrl: "https://github.com/Manidoux41/frontend2-simplon-best",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-backend-for-frontend2",
    title: "Simplon Drivers — Backend API Prototype",
    slug: "backend-for-frontend2-simplon-best",
    shortDescription:
      "An API prototype for authentication and management of coach drivers, vehicles, clients, and missions.",
    description:
      "The package manifest describes a Node.js/Express backend for coach-driver management, and its source exposes route modules for authentication, users, vehicles, clients, and missions backed by Mongoose. A README was unavailable at the checked public revision, so the description is grounded in the manifest and source rather than deployment claims.",
    problem:
      "Provide API endpoints for the mobile client’s driver, vehicle, client, and mission workflows.",
    solution:
      "An Express server groups authentication and operational routes with MongoDB/Mongoose models.",
    status: "IN_DEVELOPMENT",
    category: { name: "Transport", slug: "transport" },
    technologies: ["Node.js", "Express", "TypeScript", "MongoDB", "Mongoose"],
    githubUrl:
      "https://github.com/Manidoux41/backend-for-frontend2-simplon-best",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
  {
    id: "verified-simplon-drivers-app",
    title: "Cars Simplon Drivers — Local SQLite Prototype",
    slug: "simplon-drivers-app",
    shortDescription:
      "A mobile dashboard prototype for coach-driver missions, vehicles, and mission history.",
    description:
      "The repository README describes a driver/admin mission app. The inspected dashboard and auth hooks currently report and use local SQLite; although the README mentions Supabase, this portfolio does not claim that remote Supabase authentication or persistence is connected.",
    problem:
      "Explore mobile access to assigned missions and driver-oriented fleet workflows.",
    solution:
      "An Expo app organizes dashboard, mission, vehicle, and history screens around a local prototype.",
    status: "TEST",
    category: { name: "Transport", slug: "transport" },
    technologies: ["Expo", "React Native", "TypeScript", "Expo SQLite"],
    githubUrl: "https://github.com/Manidoux41/simplon-drivers-app",
    liveUrl: null,
    appUrl: null,
    featured: false,
    coverImage: null,
    source: "verified-github-snapshot",
  },
];

export const verifiedProjects: PortfolioProject[] = projectSnapshot.map((project) => ({
  ...project,
  coverImage: projectCover(project.slug, project.coverImage),
}));
