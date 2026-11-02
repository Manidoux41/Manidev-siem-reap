import { loadEnvConfig } from "@next/env";
import { PrismaClient, ProjectStatus } from "@prisma/client";

loadEnvConfig(process.cwd());

type GitHubRepository = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  private: boolean;
};

async function getPublicRepositories(owner: string): Promise<GitHubRepository[]> {
  const repositories: GitHubRepository[] = [];

  for (let page = 1; page <= 10; page += 1) {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=100&page=${page}&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`GitHub a répondu ${response.status} lors de la synchronisation.`);
    }

    const pageRepositories =
      (await response.json()) as GitHubRepository[];
    repositories.push(...pageRepositories.filter((repo) => !repo.private));
    if (pageRepositories.length < 100) break;
  }

  return repositories;
}

async function main() {
  const owner = process.env.GITHUB_USERNAME ?? "Manidoux41";
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL est nécessaire pour importer les dépôts.");
  }

  const repositories = await getPublicRepositories(owner);
  const prisma = new PrismaClient();
  try {
    const category = await prisma.category.upsert({
      where: { slug: "autres" },
      update: {},
      create: { slug: "autres", name: "À classer" },
    });

    for (const repo of repositories) {
      const current = await prisma.project.findUnique({
        where: { repoFullName: repo.full_name },
        select: { id: true },
      });
      const metadata = {
        githubDescription: repo.description,
        githubLanguage: repo.language,
        githubStars: repo.stargazers_count,
        githubUpdatedAt: new Date(repo.updated_at),
      };

      if (current) {
        await prisma.project.update({
          where: { id: current.id },
          data: metadata,
        });
      } else {
        await prisma.project.create({
          data: {
            title: repo.name,
            slug: `${repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${repo.full_name.split("/")[1].toLowerCase()}`,
            shortDescription: "Fiche GitHub importée, description à compléter.",
            description:
              "Complétez la présentation, vérifiez les technologies et ajoutez des liens avant publication.",
            categoryId: category.id,
            status: ProjectStatus.UNKNOWN,
            published: false,
            githubUrl: repo.html_url,
            repoFullName: repo.full_name,
            ...metadata,
          },
        });
      }
    }

    console.info(`${repositories.length} dépôts publics synchronisés pour ${owner}.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error("Échec de la synchronisation GitHub.", error);
  process.exitCode = 1;
});
