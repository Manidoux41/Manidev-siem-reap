import { loadEnvConfig } from "@next/env";
import { PrismaClient, ProjectStatus } from "@prisma/client";
import { resolveDatabaseUrl } from "../lib/database-url";
import { githubRepositoryKey } from "../lib/github-repository";

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
  const datasourceUrl = resolveDatabaseUrl(process.env);
  if (!datasourceUrl) {
    throw new Error("Une connexion PostgreSQL est nécessaire pour importer les dépôts.");
  }

  const repositories = await getPublicRepositories(owner);
  const prisma = new PrismaClient({ datasourceUrl });
  try {
    const existingProjects = await prisma.project.findMany({
      select: { id: true, slug: true, githubUrl: true, repoFullName: true },
    });
    const existingByRepository = new Map<string, string>();
    const existingSlugs = new Set(existingProjects.map(({ slug }) => slug));
    for (const project of existingProjects) {
      for (const value of [project.repoFullName, project.githubUrl]) {
        const key = githubRepositoryKey(value);
        if (key) existingByRepository.set(key, project.id);
      }
    }

    const category = await prisma.category.upsert({
      where: { slug: "autres" },
      update: {},
      create: { slug: "autres", name: "À classer" },
    });

    for (const repo of repositories) {
      const repositoryKey = githubRepositoryKey(repo.full_name);
      const existingId = repositoryKey
        ? existingByRepository.get(repositoryKey)
        : undefined;
      const metadata = {
        githubDescription: repo.description,
        githubLanguage: repo.language,
        githubStars: repo.stargazers_count,
        githubUpdatedAt: new Date(repo.updated_at),
      };

      if (existingId) {
        await prisma.project.update({
          where: { id: existingId },
          data: metadata,
        });
      } else {
        const baseSlug = `${repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${repo.full_name.split("/")[1].toLowerCase()}`;
        let slug = baseSlug;
        let suffix = 2;
        while (existingSlugs.has(slug)) {
          slug = `${baseSlug}-${suffix}`;
          suffix += 1;
        }
        const created = await prisma.project.create({
          data: {
            title: repo.name,
            slug,
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
        existingSlugs.add(slug);
        if (repositoryKey) existingByRepository.set(repositoryKey, created.id);
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
