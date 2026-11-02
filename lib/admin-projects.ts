import { prisma } from "@/lib/prisma";
import type { z } from "zod";
import { projectInputSchema } from "@/lib/validation";

export type ProjectInput = z.infer<typeof projectInputSchema>;

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function saveReferences(input: ProjectInput) {
  const category = await prisma.category.upsert({
    where: { slug: slugify(input.category) },
    update: { name: input.category },
    create: { name: input.category, slug: slugify(input.category) },
  });
  const technologies = await Promise.all(
    [...new Set(input.technologies)].map((name) =>
      prisma.technology.upsert({
        where: { slug: slugify(name) },
        update: { name },
        create: {
          name,
          slug: slugify(name),
          category: "Confirmé par les projets",
        },
      }),
    ),
  );
  return { category, technologies };
}

export async function createProject(input: ProjectInput) {
  const { category, technologies } = await saveReferences(input);
  return prisma.project.create({
    data: {
      title: input.title,
      slug: input.slug,
      shortDescription: input.shortDescription,
      description: input.description,
      problem: input.problem ?? null,
      solution: input.solution ?? null,
      status: input.status,
      categoryId: category.id,
      coverImage: input.coverImage ?? null,
      githubUrl: input.githubUrl ?? null,
      liveUrl: input.liveUrl ?? null,
      appUrl: input.appUrl ?? null,
      featured: input.featured,
      published: input.published,
      publishedAt: input.published ? new Date() : null,
      sortOrder: input.sortOrder,
      technologies: {
        create: technologies.map(({ id }) => ({ technologyId: id })),
      },
    },
    include: {
      category: { select: { name: true, slug: true } },
      technologies: { include: { technology: { select: { name: true } } } },
    },
  });
}

export async function updateProject(id: string, input: ProjectInput) {
  const { category, technologies } = await saveReferences(input);
  return prisma.$transaction(async (transaction) => {
    await transaction.projectTechnology.deleteMany({ where: { projectId: id } });
    const project = await transaction.project.update({
      where: { id },
      data: {
        title: input.title,
        slug: input.slug,
        shortDescription: input.shortDescription,
        description: input.description,
        problem: input.problem ?? null,
        solution: input.solution ?? null,
        status: input.status,
        categoryId: category.id,
        coverImage: input.coverImage ?? null,
        githubUrl: input.githubUrl ?? null,
        liveUrl: input.liveUrl ?? null,
        appUrl: input.appUrl ?? null,
        featured: input.featured,
        published: input.published,
        publishedAt: input.published ? new Date() : null,
        sortOrder: input.sortOrder,
        technologies: {
          create: technologies.map(({ id: technologyId }) => ({
            technologyId,
          })),
        },
      },
      include: {
        category: { select: { name: true, slug: true } },
        technologies: { include: { technology: { select: { name: true } } } },
      },
    });
    return project;
  });
}
