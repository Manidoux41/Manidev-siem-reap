import { connection } from "next/server";
import { locales } from "@/lib/i18n";

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
    components: {
      securitySchemes: {
        adminSession: { type: "apiKey", in: "cookie", name: "portfolio_admin_session" },
      },
    },
    paths: {
      "/testimonials": {
        get: {
          summary: "Lire uniquement les témoignages approuvés avec consentement sur des projets publiés",
          parameters: [{ name: "projectId", in: "query", schema: { type: "string", maxLength: 100 } }],
          responses: {
            "200": { description: "Liste publique (100 derniers). Aucun identifiant, consentement ou donnée de modération exposé.", content: { "application/json": { schema: {
              type: "object", properties: { data: { type: "array", items: {
                type: "object", additionalProperties: false,
                required: ["displayName", "testimony", "project"],
                properties: {
                  displayName: { type: "string" }, testimony: { type: "string" },
                  project: { type: "object", additionalProperties: false, required: ["title"], properties: { title: { type: "string" } } },
                },
              } } },
            } } } },
            "503": { description: "Témoignages indisponibles." },
          },
        },
        post: {
          summary: "Soumettre un témoignage avec consentement explicite, enregistré PENDING sans notification",
          description: "Origine identique requise. 5 tentatives par heure, clé indépendante. Aucun e-mail, entreprise ou note collecté. L’approbation manuelle ne garantit pas l’identité.",
          requestBody: { required: true, content: { "application/json": { schema: {
            type: "object", additionalProperties: false,
            required: ["projectId", "displayName", "testimony", "publicationConsent"],
            properties: {
              projectId: { type: "string", minLength: 1, maxLength: 100, description: "Identifiant d’un projet publié, validé côté serveur." },
              displayName: { type: "string", minLength: 2, maxLength: 100 },
              testimony: { type: "string", minLength: 20, maxLength: 2000 },
              publicationConsent: { type: "boolean", const: true },
              website: { type: "string", maxLength: 0 },
            },
          } } } },
          responses: {
            "201": { description: "Témoignage enregistré, non public.", content: { "application/json": { schema: { type: "object", required: ["status"], properties: { status: { type: "string", const: "PENDING" } } } } } },
            "400": { description: "JSON invalide." }, "403": { description: "Origine invalide." },
            "422": { description: "Entrées, consentement ou projet publié invalides." },
            "429": { description: "Limite de tentatives dépassée." }, "500": { description: "Échec d’enregistrement." },
            "503": { description: "Formulaire indisponible." },
          },
        },
      },
      "/admin/testimonials": {
        get: {
          summary: "Lire tous les témoignages, statuts et consentements (administration)",
          security: [{ adminSession: [] }],
          responses: { "200": { description: "Témoignages avec projet, publicationConsent et consentedAt." }, "401": { description: "Authentification requise." }, "500": { description: "Échec de chargement." }, "503": { description: "Base indisponible." } },
        },
      },
      "/admin/testimonials/{id}": {
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        patch: {
          summary: "Approuver ou rejeter/dépublier sans modifier le consentement",
          security: [{ adminSession: [] }],
          requestBody: { required: true, content: { "application/json": { schema: {
            type: "object", additionalProperties: false, required: ["status"],
            properties: { status: { type: "string", enum: ["APPROVED", "REJECTED"] } },
          } } } },
          responses: { "200": { description: "Statut persisté. APPROVED exige le consentement existant et un projet publié." }, "400": { description: "JSON invalide." }, "401": { description: "Authentification requise." }, "403": { description: "Origine invalide." }, "404": { description: "Absent ou approbation impossible." }, "422": { description: "Statut invalide ou champs interdits." }, "500": { description: "Échec de modération." }, "503": { description: "Base indisponible." } },
        },
        delete: {
          summary: "Supprimer définitivement un témoignage, notamment après retrait du consentement",
          security: [{ adminSession: [] }],
          responses: { "200": { description: "Témoignage supprimé." }, "401": { description: "Authentification requise." }, "403": { description: "Origine invalide." }, "404": { description: "Introuvable." }, "500": { description: "Échec de suppression." }, "503": { description: "Base indisponible." } },
        },
      },
      "/projects": {
        get: {
          summary: "Lister les projets publiés",
          parameters: [
            {
              name: "locale",
              in: "query",
              schema: { type: "string", enum: locales, default: "en" },
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
              schema: { type: "string", enum: locales, default: "en" },
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
              schema: { type: "string", enum: locales, default: "en" },
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
              schema: { type: "string", enum: locales, default: "en" },
            },
          ],
          responses: { "200": { description: "Catégories." } },
        },
      },
      "/technologies": { get: { summary: "Lister les technologies utilisées", responses: { "200": { description: "Technologies." } } } },
      "/skills": { get: { summary: "Lister les compétences publiées, dont la spécialisation IA", parameters: [{ name: "locale", in: "query", schema: { type: "string", enum: locales, default: "en" } }], responses: { "200": { description: "Compétences." } } } },
      "/experiences": { get: { summary: "Lister les expériences publiées", responses: { "200": { description: "Expériences." } } } },
      "/site-settings/public": { get: { summary: "Lire les paramètres publics autorisés", responses: { "200": { description: "Paramètres publics." } } } },
      "/contact": {
        post: {
          summary: "Enregistrer un message de contact et tenter sa notification Gmail",
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
            "201": {
              description: "Message enregistré. Une notification en attente ne nécessite pas une nouvelle soumission.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["message", "notification"],
                    properties: {
                      message: { type: "string" },
                      notification: {
                        type: "string", enum: ["accepted", "pending"],
                        description: "accepted : Gmail a accepté l'e-mail ; pending : notification à relancer, message conservé.",
                      },
                    },
                  },
                },
              },
            },
            "400": { description: "Corps JSON invalide." },
            "403": { description: "Origine de requête invalide." },
            "422": { description: "Entrées invalides." },
            "429": { description: "Limite de requêtes dépassée." },
            "500": { description: "Échec de l'enregistrement." },
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
        get: { summary: "Lire les messages privés (administration)", responses: { "200": { description: "Messages privés avec notificationPending, notificationClaimedAt et notifiedAt (acceptation SMTP, pas livraison garantie)." }, "401": { description: "Authentification requise." } } },
      },
      "/admin/messages/{id}": {
        patch: { summary: "Mettre à jour le statut d'un message (administration)", responses: { "200": { description: "Statut mis à jour." }, "401": { description: "Authentification requise." } } },
        delete: {
          summary: "Supprimer définitivement un message de la base (administration)",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Message définitivement supprimé." },
            "401": { description: "Authentification requise." },
            "403": { description: "Origine de requête invalide." },
            "404": { description: "Message introuvable." },
            "500": { description: "Échec de la suppression." },
            "503": { description: "Base de données indisponible." },
          },
        },
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
