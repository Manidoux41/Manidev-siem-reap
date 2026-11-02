# Manfred Parbatia — Portfolio

English-first multilingual portfolio built with Next.js App Router, TypeScript,
PostgreSQL, and Prisma. The public site is available in English, French, German,
and Spanish at `/en`, `/fr`, `/de`, and `/es`; `/` redirects to `/en`. The
language selector preserves the current page, and older unprefixed project
links redirect to their English equivalents. The site uses an editorial dark
design, original CSS illustrations, and light parallax disabled when
`prefers-reduced-motion` is enabled. Manfred is based in Siem Reap, Cambodia.

## Prérequis

- Node.js 22.6 ou supérieur.
- npm.
- PostgreSQL 14+ pour l'administration, les messages et la persistance du
contenu.

## Installation locale

```bash
npm install
cp .env.example .env
```

Renseignez `DATABASE_URL` dans `.env` avec une URL PostgreSQL. `DIRECT_URL`
n'est pas utilisé par cette configuration Prisma : la même URL sert aux
requêtes applicatives et aux migrations. Configurez également une vraie URL
`NEXT_PUBLIC_SITE_URL` avant le déploiement.

```bash
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run admin:create
npm run dev
```

`db:migrate` convient au développement et à la création de migrations. En
production, appliquez les migrations versionnées avec `npm run db:deploy`
avant de lancer la nouvelle version. Le seed est idempotent : il crée les
catégories, technologies, quatre projets vérifiés et les réglages de base sans
remplacer les descriptions déjà éditées.
La migration de localisation convertit les anciens textes français de départ
en anglais uniquement lorsqu'ils correspondent encore aux valeurs initiales ;
les champs édités dans l'administration sont conservés.

Le seed initial et la page d'accueil fonctionnent aussi sans `DATABASE_URL`
avec un instantané local des quatre projets vérifiés. Dans ce mode, le formulaire
de contact et l'administration répondent explicitement qu'une base doit être
configurée ; aucun message n'est présenté comme envoyé s'il n'a pas été stocké.

## Compte administrateur

Après migration de la base, lancez :

```bash
npm run admin:create
```

La commande demande un e-mail et un mot de passe de 16 caractères minimum,
puis stocke un hash scrypt salé. Il n'existe aucun compte ni mot de passe par
défaut dans le code. Relancer la commande pour la même adresse remplace le hash
du mot de passe.

L'interface se trouve sur `/admin`. Elle permet de créer, modifier, publier,
dépublier, réordonner et supprimer des projets, de gérer leurs catégories,
technologies et liens, de consulter les messages privés, et de modifier les
réglages publics. Les sessions sont stockées côté serveur et utilisent un
cookie `HttpOnly`, `SameSite=Strict`, `Secure` en production. Les mutations
vérifient l'origine et l'utilisateur connecté.

Les limites de connexion et de formulaire sont stockées dans PostgreSQL sous
forme de clés IP hachées. Le proxy de production doit fournir `x-real-ip` ;
sans base, le limiteur utilise seulement la mémoire du processus. Les règles
persistantes ne remplacent pas un WAF ou une protection anti-abus au niveau du
fournisseur.

## Projets et vérification des informations

Les fiches publiques sont fondées sur les dépôts accessibles de Manidoux41,
leurs README et les sites associés :

- **MMC Go Drivers** — dépôt Flutter/Dart, site
  <https://mmcgodrivers-website.vercel.app/>. Le dépôt et le site répondaient
  lors de la vérification. Le statut de l'application et sa distribution
  mobile ne sont pas déclarés ; aucun lien Google Play n'est publié.
- **La Voix des Enfants Placés — Vienne** — dépôt TypeScript avec Next.js,
  Prisma et PostgreSQL, site
  <https://la-voix-des-enfants-places-vienne.vercel.app/>. Le dépôt avertit
  que les contenus et coordonnées associatifs doivent être validés par
  l'association avant publication.
- **Saiway** — plateforme de transferts aéroport à Siem Reap, avec des flux de
  réservation et des outils par rôle pour les clients, chauffeurs et
  administrateurs. Dépôt Next.js/TypeScript avec Prisma et PostgreSQL ; site
  <https://gestion-planning-91ve.vercel.app>.
- **KHMERA** — informations et services sur devis pour préparer une installation,
  un projet professionnel ou un séjour à Siem Reap. Site Next.js/TypeScript en
  anglais, français, espagnol et allemand ; les offres publiques sont
  informatives et les réservations/paiements en ligne ne sont pas actifs.
  <https://khmera.vercel.app>.

Le statut de cycle de vie des projets est conservé comme « à confirmer ». Les
liens des deux nouveaux sites ont répondu en HTTP 200 lors de la vérification.
Le dépôt public associé au site de nounou n'a pas pu être identifié avec les
recherches GitHub par nom/description ; aucune fiche ni URL n'a été inventée.

Une synchronisation facultative importe les dépôts publics du compte configuré :

```bash
npm run github:sync
```

`GITHUB_USERNAME` vaut par défaut `Manidoux41`. La commande pagine l'API
officielle GitHub. Les nouveaux dépôts sont créés comme brouillons « à
compléter ». Les synchronisations ultérieures ne remplacent que les champs de
métadonnées GitHub dédiés (`githubDescription`, `githubLanguage`, étoiles et
date de mise à jour), jamais les textes éditoriaux, images, liens renseignés
manuellement ou statut de publication.

## Images et e-mail

Les visuels présents sans photographie sont des compositions CSS originales,
pas des captures d'écran. Les images de couverture peuvent utiliser un hôte
HTTPS autorisé ; ajoutez uniquement ses noms d'hôte à `IMAGE_HOSTS`
(séparés par des virgules), puis reconstruisez l'application. Next Image
n'autorise que ces hôtes et optimise les images. Les fichiers ne sont pas
téléversés par l'administration : utilisez un stockage objet ou un CDN
compatible et renseignez son URL.

Les messages de contact sont enregistrés dans PostgreSQL et consultables dans
`/admin`. Aucun fournisseur e-mail n'est configuré ou appelé par défaut ; le
visiteur n'est pas informé d'un envoi d'e-mail inexistant. Configurez un
fournisseur transactionnel avant d'ajouter cette intégration.
Le lien Telegram n'est affiché que lorsqu'une URL de profil ou de contact est
configurée dans `/admin` (format HTTPS `t.me` ou `telegram.me`).

## API REST

La spécification OpenAPI JSON est consultable sur `/api/v1/openapi`.

| Route | Usage |
|---|---|
| `GET /api/v1/projects` | Projets publics, filtre optionnel `locale` (`en`, `fr`, `de`, `es`), `category`, `featured`, `q`, pagination `page`/`perPage` |
| `GET /api/v1/projects/featured` | Projets mis en avant, filtre optionnel `locale` |
| `GET /api/v1/projects/:slug` | Détail public, filtre optionnel `locale` |
| `GET /api/v1/categories` | Catégories visibles, filtre optionnel `locale` |
| `GET /api/v1/technologies` | Technologies reliées aux projets publiés |
| `GET /api/v1/skills` | Compétences publiées |
| `GET /api/v1/experiences` | Expériences publiées |
| `GET /api/v1/site-settings/public` | Liste blanche des réglages publics |
| `POST /api/v1/contact` | Valide et enregistre un message |
| `POST /api/v1/admin/auth/login` | Ouvre une session administrateur |
| `POST /api/v1/admin/auth/logout` | Ferme une session |
| `/api/v1/admin/projects` | Lecture et création des projets |
| `/api/v1/admin/projects/:id` | Modification et suppression |
| `/api/v1/admin/messages` | Lecture privée des messages |
| `/api/v1/admin/messages/:id` | Mise à jour du statut d'un message |
| `/api/v1/admin/settings` | Lecture et modification des réglages éditoriaux |

Les textes éditoriaux des nouveaux projets sont rédigés en anglais, langue
source par défaut ; les projets sélectionnés disposent de traductions en
français, allemand et espagnol. Les erreurs de validation utilisent des codes
HTTP explicites. Les messages privés ne sont jamais renvoyés par les routes
publiques. Les URL de projets et de réseaux doivent utiliser HTTPS ; les
couvertures doivent provenir d'un hôte configuré.

## Variables d'environnement

| Variable | Obligatoire | Description |
|---|---:|---|
| `DATABASE_URL` | En production | Connexion PostgreSQL de Prisma |
| `NEXT_PUBLIC_SITE_URL` | En production | Origine HTTPS canonique ; utilisée par le sitemap |
| `IMAGE_HOSTS` | Si images distantes | Hôtes HTTPS autorisés par Next Image, séparés par des virgules |
| `GITHUB_USERNAME` | Non | Compte à synchroniser, défaut `Manidoux41` |

Les secrets ne doivent être ajoutés qu'aux variables d'environnement locales
ou au coffre de secrets du fournisseur ; ne committez jamais `.env`.

## Vérifications

```bash
npm run db:generate
npm run typecheck
npm run lint
npm test
npm run build
```

Les tests unitaires couvrent la validation du contact et des projets, les hashes
de mot de passe, les vérifications d'origine et le limiteur sans base de données.
La synchronisation du contenu et la connexion PostgreSQL nécessitent une base
réelle.

## Déploiement Vercel / PostgreSQL managé

1. Créez une base PostgreSQL managée (Neon, Supabase ou équivalent) et configurez
   sa chaîne de connexion directe dans `DATABASE_URL`.
2. Définissez `NEXT_PUBLIC_SITE_URL` avec le domaine HTTPS réellement attaché.
   Ajoutez `IMAGE_HOSTS` uniquement si un hôte d'images est utilisé.
3. Configurez les mêmes variables dans l'environnement de production Vercel.
4. Avant le déploiement de l'application, exécutez `npm run db:deploy` depuis
   un environnement autorisé à joindre la base. N'exécutez aucune migration
   destructive sans revue et confirmation explicites.
5. Exécutez `npm run db:seed` après les migrations. Le seed est idempotent et
   ajoute les nouveaux projets sans remplacer le contenu déjà édité ; créez
   ensuite le compte avec `npm run admin:create`.
6. Vérifiez le site, `/api/v1/projects`, `/api/v1/openapi`, `/robots.txt`,
   `/sitemap.xml`, le formulaire et les parcours administrateur.
7. Activez les sauvegardes automatiques du fournisseur et testez périodiquement
   une restauration. Avant les migrations majeures, conservez une sauvegarde
   vérifiée.

Le workflow GitHub Actions exécute lint, TypeScript, tests et build sur les
pull requests et les pushes. L'envoi d'e-mails, l'upload d'images, les
informations de profil supplémentaires et le dépôt du site de nounou restent
à configurer ou à fournir.
