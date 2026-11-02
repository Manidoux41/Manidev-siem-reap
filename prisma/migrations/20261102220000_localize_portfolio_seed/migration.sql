UPDATE "Project"
SET
  "shortDescription" = CASE
    WHEN "shortDescription" = 'Une application mobile pensée pour les conducteurs et les gestionnaires de flotte.'
    THEN 'A mobile app for drivers, trip planning, and fleet management.'
    ELSE "shortDescription"
  END,
  "description" = CASE
    WHEN "description" = 'MMC Go Drivers réunit des outils de navigation adaptés aux véhicules, la gestion de trajets et de plannings, ainsi qu''un espace d''administration de flotte. La présentation est fondée sur le README public du dépôt.'
    THEN 'MMC Go Drivers brings together vehicle-friendly navigation, trip and schedule management, and fleet administration tools. This description is based on the public repository README.'
    ELSE "description"
  END,
  "problem" = CASE
    WHEN "problem" = 'Les conducteurs et les petites entreprises de transport ont besoin d''outils de navigation, de planning et de documents réunis dans un même espace.'
    THEN 'Drivers and small transport businesses need navigation, planning, and documents in one place.'
    ELSE "problem"
  END,
  "solution" = CASE
    WHEN "solution" = 'L''application propose des fonctions dédiées aux conducteurs de bus, de taxi et de poids lourds, avec des fonctionnalités de gestion pour les entreprises.'
    THEN 'The app offers dedicated tools for bus, taxi, and truck drivers, alongside fleet management features for businesses.'
    ELSE "solution"
  END
WHERE "slug" = 'mmc-go-drivers';

UPDATE "Project"
SET
  "shortDescription" = CASE
    WHEN "shortDescription" = 'Une refonte éditoriale responsive pour un site associatif consacré à la protection de l''enfance.'
    THEN 'A responsive editorial website for an organization focused on child protection.'
    ELSE "shortDescription"
  END,
  "description" = CASE
    WHEN "description" = 'Le dépôt présente un site public avec des pages d''information et des actualités gérées avec Prisma et PostgreSQL. Il comprend également un espace privé pour gérer les articles. Les contenus et coordonnées sont à valider par l''association avant publication.'
    THEN 'The repository describes a public site with information pages and news managed with Prisma and PostgreSQL. It also includes a private area for managing articles. The organization must validate its content and contact details before publication.'
    ELSE "description"
  END,
  "problem" = CASE
    WHEN "problem" = 'Rendre les informations de l''association accessibles et permettre à son équipe de publier des actualités sans modifier le code.'
    THEN 'Make the organization''s information accessible and let its team publish news without changing code.'
    ELSE "problem"
  END,
  "solution" = CASE
    WHEN "solution" = 'Une interface éditoriale responsive reliée à une base de données, avec une gestion privée des articles et un formulaire de contact.'
    THEN 'A responsive editorial interface connected to a database, with private article management and a contact form.'
    ELSE "solution"
  END
WHERE "slug" = 'la-voix-des-enfants-places';

UPDATE "Category"
SET "name" = 'Mobile app'
WHERE "slug" = 'mobile' AND "name" = 'Application mobile';

UPDATE "Category"
SET "name" = 'Website'
WHERE "slug" = 'web' AND "name" = 'Site web';

UPDATE "SiteSetting"
SET "value" = 'Manfred Parbatia — Full-Stack Developer'
WHERE "key" = 'site.title'
  AND "value" = 'Manfred Parbatia — Développeur Full-Stack';

UPDATE "SiteSetting"
SET "value" = 'Portfolio of Manfred Parbatia, a full-stack developer building practical digital products for web and mobile.'
WHERE "key" = 'site.description'
  AND "value" = 'Portfolio de Manfred Parbatia, développeur web Full-Stack. Des projets numériques concrets, du web au mobile.';

UPDATE "SiteSetting"
SET "value" = 'en'
WHERE "key" = 'site.locale' AND "value" = 'fr';

INSERT INTO "SiteSetting" ("id", "key", "value", "updatedAt")
VALUES ('site-telegram-default', 'site.telegram', '', CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO NOTHING;
