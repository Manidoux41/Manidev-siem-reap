import { connection } from "next/server";
import { Suspense } from "react";
import {
  AdminConsole,
  AdminLogin,
  type AdminConsoleInitialData,
} from "@/components/admin-console";
import { SiteHeader } from "@/components/site-header";
import { getAdminUser } from "@/lib/admin-session";
import { databaseConfigured, getPrisma } from "@/lib/prisma";

export default function AdminPage() {
  return (
    <>
      <SiteHeader
        locale="fr"
        currentPath="/fr"
        showLanguageSwitcher={false}
      />
      <main className="admin-page">
        <p className="eyebrow">Portfolio / Administration</p>
        <h1>Éditer le contenu.</h1>
        <Suspense
          fallback={
            <section className="admin-card" aria-busy="true">
              <p className="admin-note">Chargement de l’espace sécurisé…</p>
            </section>
          }
        >
          <AdminContent />
        </Suspense>
      </main>
    </>
  );
}

async function AdminContent() {
  await connection();
  const admin = databaseConfigured ? await getAdminUser() : null;
  let initialData: AdminConsoleInitialData = {
    projects: [],
    messages: [],
    settings: {},
  };

  if (admin) {
    const prisma = getPrisma();
    const [projects, messages, settings] = await Promise.all([
      prisma.project.findMany({
        include: {
          category: { select: { name: true } },
          technologies: {
            include: { technology: { select: { name: true } } },
          },
        },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      prisma.siteSetting.findMany({
        where: {
          key: {
            in: [
              "site.title",
              "site.description",
              "site.locale",
              "site.github",
              "site.telegram",
            ],
          },
        },
        select: { key: true, value: true },
      }),
    ]);

    initialData = {
      projects: projects.map((project) => ({
        id: project.id,
        title: project.title,
        slug: project.slug,
        shortDescription: project.shortDescription,
        description: project.description,
        problem: project.problem,
        solution: project.solution,
        status: project.status,
        category: project.category.name,
        technologies: project.technologies.map(
          ({ technology }) => technology.name,
        ),
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        appUrl: project.appUrl,
        coverImage: project.coverImage,
        featured: project.featured,
        published: project.published,
        sortOrder: project.sortOrder,
      })),
      messages: messages.map((message) => ({
        ...message,
        createdAt: message.createdAt.toISOString(),
      })),
      settings: Object.fromEntries(
        settings.map(({ key, value }) => [key, value]),
      ),
    };
  }

  if (!databaseConfigured) {
    return (
      <section className="admin-card">
        <p className="eyebrow">Configuration requise</p>
        <p className="admin-note">
          Configurez une connexion PostgreSQL (<code>POSTGRES_URL</code>,
          {" "}<code>DATABASE_URL_POOLED</code> ou <code>DATABASE_URL</code>), appliquez les migrations,
          exécutez le seed puis créez le premier compte avec{" "}
          <code>npm run admin:create</code>. L’administration ne crée pas
          de compte ou mot de passe par défaut.
        </p>
      </section>
    );
  }
  return admin ? <AdminConsole initialData={initialData} /> : <AdminLogin />;
}
