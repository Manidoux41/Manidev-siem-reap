import { loadEnvConfig } from "@next/env";
import { PrismaClient, ProjectStatus } from "@prisma/client";
import { verifiedProjects } from "../lib/portfolio-data";
import { resolveDatabaseUrl } from "../lib/database-url";
import { githubRepositoryKey } from "../lib/github-repository";
import { aiSkill } from "../lib/profile-skills";

loadEnvConfig(process.cwd());

const datasourceUrl = resolveDatabaseUrl(process.env);
if (!datasourceUrl) throw new Error("A PostgreSQL connection is required for seeding.");
const prisma = new PrismaClient({ datasourceUrl });

async function main() {
  await prisma.skill.upsert({
    where: { name_category: { name: aiSkill.name, category: aiSkill.category } },
    update: {},
    create: { ...aiSkill, published: true },
  });

  const existingProjects = await prisma.project.findMany({
    select: { slug: true, githubUrl: true, repoFullName: true },
  });
  const existingSlugs = new Set(existingProjects.map(({ slug }) => slug));
  const existingRepositories = new Set(
    existingProjects.flatMap(({ githubUrl, repoFullName }) =>
      [githubUrl, repoFullName]
        .map(githubRepositoryKey)
        .filter((key): key is string => key !== null),
    ),
  );
  let insertedProjects = 0;
  let skippedProjects = 0;

  for (const [sortOrder, project] of verifiedProjects.entries()) {
    const repositoryKey = githubRepositoryKey(project.githubUrl);
    if (
      (repositoryKey && existingRepositories.has(repositoryKey)) ||
      existingSlugs.has(project.slug)
    ) {
      skippedProjects += 1;
      continue;
    }

    const category = await prisma.category.upsert({
      where: { slug: project.category.slug },
      update: {},
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

    const repoFullName = repositoryKey ?? undefined;
    await prisma.project.create({
      data: {
        title: project.title,
        slug: project.slug,
        shortDescription: project.shortDescription,
        description: project.description,
        problem: project.problem,
        solution: project.solution,
        status: ProjectStatus[project.status],
        categoryId: category.id,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        appUrl: project.appUrl,
        featured: project.featured,
        published: true,
        publishedAt: new Date(),
        sortOrder,
        ...(repoFullName ? { repoFullName } : {}),
        technologies: {
          create: technologyIds.map((technologyId) => ({ technologyId })),
        },
      },
    });
    existingSlugs.add(project.slug);
    if (repositoryKey) existingRepositories.add(repositoryKey);
    insertedProjects += 1;
  }

  console.info(
    `Added ${insertedProjects} curated projects; skipped ${skippedProjects} existing projects to preserve database edits.`,
  );

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
