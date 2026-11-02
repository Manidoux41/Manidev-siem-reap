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
};

export const verifiedProjects: PortfolioProject[] = [
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
];
