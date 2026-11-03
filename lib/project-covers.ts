const illustratedProjects = new Set([
  "voix-et-enfance", "cv-builder-app", "association-declaration", "gestion-planning",
  "nos-liens-nos-enfants-contre-l-ase", "cv-international-manfred", "mmcgodrivers-website",
  "tuktukgo", "test-vs-2", "testapprn", "flutter-first-app", "frontend2-simplon-best",
  "backend-for-frontend2-simplon-best", "simplon-drivers-app",
]);

export function projectCover(slug: string, coverImage: string | null): string | null {
  return coverImage || (illustratedProjects.has(slug) ? `/images/projects/${slug}.svg` : null);
}
