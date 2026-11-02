import { loadEnvConfig } from "@next/env";
import { PrismaClient, ProjectStatus } from "@prisma/client";
import { verifiedProjects } from "../lib/portfolio-data";

loadEnvConfig(process.cwd());

const prisma = new PrismaClient();

async function main() {
  for (const project of verifiedProjects) {
    const category = await prisma.category.upsert({
      where: { slug: project.category.slug },
      update: { name: project.category.name },
      create: {
        slug: project.category.slug,
        name: project.category.name,
      },
    });

    const technologyIds = await Promise.all(
      project.technologies.map(async (name) => {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const technology = await prisma.technology.upsert({
          where: { slug },
          update: {},
          create: {
            name,
            slug,
            category: project.category.name,
          },
        });
        return technology.id;
      }),
    );

    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        repoFullName: project.githubUrl?.replace("https://github.com/", "") ?? null,
      },
      create: {
        title: project.title,
        slug: project.slug,
        shortDescription: project.shortDescription,
        description: project.description,
        problem: project.problem,
        solution: project.solution,
        status: ProjectStatus.UNKNOWN,
        categoryId: category.id,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        appUrl: project.appUrl,
        featured: project.featured,
        published: true,
        publishedAt: new Date(),
        repoFullName: project.githubUrl?.replace("https://github.com/", "") ?? null,
        technologies: {
          create: technologyIds.map((technologyId) => ({ technologyId })),
        },
      },
    });
  }

  await Promise.all([
    prisma.siteSetting.upsert({
      where: { key: "site.title" },
      update: {},
      create: { key: "site.title", value: "Manfred Parbatia — Full-Stack Developer" },
    }),
    prisma.siteSetting.upsert({
      where: { key: "site.description" },
      update: {},
      create: {
        key: "site.description",
        value:
          "Portfolio of Manfred Parbatia, a full-stack developer building practical digital products for web and mobile.",
      },
    }),
    prisma.siteSetting.upsert({
      where: { key: "site.locale" },
      update: {},
      create: { key: "site.locale", value: "en" },
    }),
    prisma.siteSetting.upsert({
      where: { key: "site.telegram" },
      update: {},
      create: { key: "site.telegram", value: "" },
    }),
  ]);
}

main()
  .catch((error: unknown) => {
    console.error("Échec du seed Prisma.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
