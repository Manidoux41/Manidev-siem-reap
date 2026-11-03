import { getPrisma, databaseConfigured } from "@/lib/prisma";
import { cache } from "react";
import {
  verifiedProjects,
  type PortfolioProject,
} from "@/lib/portfolio-data";

function mapDatabaseProject(
  project: Awaited<ReturnType<typeof findDatabaseProjects>>[number],
): PortfolioProject {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    shortDescription: project.shortDescription,
    description: project.description,
    problem: project.problem,
    solution: project.solution,
    status: project.status,
    category: project.category,
    technologies: project.technologies.map(
      ({ technology }) => technology.name,
    ),
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    appUrl: project.appUrl,
    featured: project.featured,
    coverImage: project.coverImage,
    source: "database",
    updatedAt: project.updatedAt.toISOString(),
  };
}

function findDatabaseProjects() {
  return getPrisma().project.findMany({
    where: { published: true },
    include: {
      category: { select: { name: true, slug: true } },
      technologies: {
        include: { technology: { select: { name: true } } },
      },
    },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export const getPublicProjects = cache(async (): Promise<PortfolioProject[]> => {
  if (!databaseConfigured) return verifiedProjects;
  return (await findDatabaseProjects()).map(mapDatabaseProject);
});

export const getPublicProject = cache(async (
  slug: string,
): Promise<PortfolioProject | null> => {
  if (!databaseConfigured) {
    return verifiedProjects.find((project) => project.slug === slug) ?? null;
  }

  const project = await getPrisma().project.findFirst({
    where: { slug, published: true },
    include: {
      category: { select: { name: true, slug: true } },
      technologies: {
        include: { technology: { select: { name: true } } },
      },
    },
  });
  return project ? mapDatabaseProject(project) : null;
});
