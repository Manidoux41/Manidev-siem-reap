import { connection } from "next/server";

export async function GET() {
  await connection();
  return Response.json({
    openapi: "3.1.0",
    info: {
      title: "Portfolio API",
      version: "1.0.0",
      description: "API REST versionnée du portfolio de Manfred Parbatia.",
    },
    servers: [{ url: "/api/v1" }],
    paths: {
      "/projects": {
        get: {
          summary: "Lister les projets publiés",
          parameters: [
            {
              name: "locale",
              in: "query",
              schema: { type: "string", enum: ["en", "fr", "de", "es"], default: "en" },
            },
            { name: "category", in: "query", schema: { type: "string" } },
            { name: "featured", in: "query", schema: { type: "boolean" } },
            { name: "q", in: "query", schema: { type: "string" } },
            { name: "page", in: "query", schema: { type: "integer", minimum: 1 } },
            {
              name: "perPage",
              in: "query",
              schema: { type: "integer", minimum: 1, maximum: 50 },
            },
          ],
          responses: { "200": { description: "Projets paginés." } },
        },
      },
      "/projects/featured": {
        get: {
          summary: "Lister les projets mis en avant",
          parameters: [
            {
              name: "locale",
              in: "query",
              schema: { type: "string", enum: ["en", "fr", "de", "es"], default: "en" },
            },
          ],
          responses: { "200": { description: "Projets mis en avant." } },
        },
      },
      "/projects/{slug}": {
        get: {
          summary: "Afficher un projet publié",
          parameters: [
            { name: "slug", in: "path", required: true, schema: { type: "string" } },
            {
              name: "locale",
              in: "query",
              schema: { type: "string", enum: ["en", "fr", "de", "es"], default: "en" },
            },
          ],
          responses: { "200": { description: "Projet." }, "404": { description: "Projet introuvable." } },
        },
      },
      "/categories": {
        get: {
          summary: "Lister les catégories",
          parameters: [
            {
              name: "locale",
              in: "query",
              schema: { type: "string", enum: ["en", "fr", "de", "es"], default: "en" },
            },
          ],
          responses: { "200": { description: "Catégories." } },
        },
      },
      "/technologies": { get: { summary: "Lister les technologies utilisées", responses: { "200": { description: "Technologies." } } } },
      "/skills": { get: { summary: "Lister les compétences publiées, dont la spécialisation IA", parameters: [{ name: "locale", in: "query", schema: { type: "string", enum: ["en", "fr", "de", "es"], default: "en" } }], responses: { "200": { description: "Compétences." } } } },
      "/experiences": { get: { summary: "Lister les expériences publiées", responses: { "200": { description: "Expériences." } } } },
      "/site-settings/public": { get: { summary: "Lire les paramètres publics autorisés", responses: { "200": { description: "Paramètres publics." } } } },
      "/contact": {
        post: {
          summary: "Enregistrer un message de contact",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "subject", "message"],
                  properties: {
                    name: { type: "string", minLength: 2, maxLength: 100 },
                    email: { type: "string", format: "email" },
                    subject: { type: "string", minLength: 3, maxLength: 160 },
                    message: { type: "string", minLength: 20, maxLength: 5000 },
                    website: { type: "string", maxLength: 0 },
                  },
                },
              },
            },
          },
          responses: {
            "201": { description: "Message enregistré." },
            "422": { description: "Entrées invalides." },
            "429": { description: "Limite de requêtes dépassée." },
            "503": { description: "Base de données indisponible." },
          },
        },
      },
      "/admin/auth/login": {
        post: { summary: "Ouvrir une session administrateur", responses: { "200": { description: "Session ouverte via cookie sécurisé." } } },
      },
      "/admin/auth/logout": {
        post: { summary: "Fermer la session administrateur", responses: { "200": { description: "Session fermée." } } },
      },
      "/admin/projects": {
        get: { summary: "Lister tous les projets (administration)", responses: { "200": { description: "Projets administrés." }, "401": { description: "Authentification requise." } } },
        post: { summary: "Créer un projet (administration)", responses: { "201": { description: "Projet créé." }, "401": { description: "Authentification requise." }, "422": { description: "Entrées invalides." } } },
      },
      "/admin/projects/{id}": {
        patch: { summary: "Modifier un projet (administration)", responses: { "200": { description: "Projet modifié." }, "401": { description: "Authentification requise." } } },
        delete: { summary: "Supprimer un projet (administration)", responses: { "200": { description: "Projet supprimé." }, "401": { description: "Authentification requise." } } },
      },
      "/admin/messages": {
        get: { summary: "Lire les messages privés (administration)", responses: { "200": { description: "Messages privés." }, "401": { description: "Authentification requise." } } },
      },
      "/admin/messages/{id}": {
        patch: { summary: "Mettre à jour le statut d'un message (administration)", responses: { "200": { description: "Statut mis à jour." }, "401": { description: "Authentification requise." } } },
      },
      "/admin/settings": {
        get: { summary: "Lire les paramètres administrables", responses: { "200": { description: "Paramètres." }, "401": { description: "Authentification requise." } } },
        patch: { summary: "Modifier les paramètres administrables", responses: { "200": { description: "Paramètres mis à jour." }, "401": { description: "Authentification requise." } } },
      },
      "/admin/business-cards": {
        get: { summary: "Lister les cartes de l’administrateur connecté", responses: { "200": { description: "Identifiants, noms et dates des modèles privés." }, "401": { description: "Authentification requise." } } },
        post: {
          summary: "Enregistrer un modèle de carte avec images PNG normalisées (2,2 Mo maximum)",
          requestBody: { required: true, content: { "application/json": { schema: {
            type: "object", required: ["label", "details", "images", "showPortrait", "cropMarks"],
            properties: {
              label: { type: "string", maxLength: 80 },
              details: { type: "object", required: ["name", "title", "address", "whatsapp", "telegram", "website"], properties: {
                name: { type: "string", maxLength: 80 }, title: { type: "string", maxLength: 120 },
                address: { type: "string", maxLength: 150 }, whatsapp: { type: "string", maxLength: 40 },
                telegram: { type: "string", maxLength: 80 }, website: { type: "string", maxLength: 150 },
              } },
              images: { type: "object", description: "Data URLs PNG, 700000 caractères maximum par image. Portrait : URL locale par défaut également autorisée. Chaîne vide : image absente.", required: ["portrait", "whatsappQr", "telegramQr"] },
              showPortrait: { type: "boolean" }, cropMarks: { type: "boolean" },
            },
          } } } },
          responses: { "201": { description: "Modèle enregistré." }, "401": { description: "Authentification requise." }, "413": { description: "Corps trop volumineux." }, "422": { description: "Données invalides." } },
        },
      },
      "/admin/business-cards/{id}": {
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        get: { summary: "Charger une carte appartenant à l’administrateur connecté", responses: { "200": { description: "Modèle complet." }, "404": { description: "Carte introuvable ou appartenant à un autre compte." } } },
        patch: { summary: "Remplacer le modèle complet (même corps que POST /admin/business-cards)", responses: { "200": { description: "Modèle modifié." }, "404": { description: "Carte introuvable." }, "413": { description: "Corps trop volumineux." }, "422": { description: "Données invalides." } } },
        delete: { summary: "Supprimer sa carte de visite", responses: { "200": { description: "Carte supprimée." }, "404": { description: "Carte introuvable." } } },
      },
    },
  });
}
