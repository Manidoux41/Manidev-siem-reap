# Manfred Parbatia — Portfolio

English-first multilingual portfolio built with Next.js App Router, TypeScript,
PostgreSQL, and Prisma. The public site is available in English, French, German,
Spanish, Khmer, simplified Chinese and Japanese at `/en`, `/fr`, `/de`, `/es`,
`/km`, `/zh` and `/ja`; `/` redirects to `/en`. The language selector uses a full
document navigation to apply the translated root layout and HTML language reliably,
preserving the actual page, query parameters and anchor. Older unprefixed project
links redirect to their English equivalents. The site uses an editorial dark
design, original CSS illustrations, and light parallax disabled when
`prefers-reduced-motion` is enabled. Manfred is based in Siem Reap, Cambodia.
Content blocks assemble from alternating left/right edges as they enter the viewport
and reverse as they leave it. Progress follows scroll position rather than a one-shot
timer. Keyboard focus keeps interactive blocks visible; reduced-motion preferences
disable assembly and parallax. Streamed content is registered as it arrives.
Service and commercial-offer grids animate as single groups so neighboring cards
retain their spacing throughout the scroll animation.
The home hero features a locally cropped, lightly brightened and sharpened
portrait, optimized as WebP. The original photo is preserved; the portrait
sits beside the heading on desktop and below it on mobile.
Projects retain their illustrated cards in a horizontal, scroll-snapping
full-width slideshow with a centered, fully visible active card and translucent
neighbor previews on either side (where a neighbor exists). Previous/next
controls, keyboard arrows, native touch swiping and mouse dragging are supported.
Dragging does not open project links; normal clicks still do. Category filters
restart at the first matching project; navigation
respects reduced-motion preferences and does not auto-advance.
The Manidev identity uses neutral charcoal surfaces, warm off-white text and
accessible orange accents. Cyan and navy from the logo remain secondary details,
not large blue backgrounds.
Navigation, project cards and illustrations, buttons, forms, footer and admin
share this palette; success/error colors remain distinct for clear feedback.
The logo appears in the shared header, public footers, admin sidebar and error
pages, with a matching browser favicon. The original
`public/images/logo-manidev.png` is preserved; the cropped, optimized
`public/images/logo-manidev-brand.webp` removes the white background and margins.
Its navy lettering is adapted to warm off-white, and the illustration's blues
are brightened for readability on dark surfaces. Orange and cyan remain.
No white panel or border surrounds the logo.
The About section presents the 2023 OpenClassrooms Web Developer diploma
(level IV, as provided by the portfolio owner) in all seven languages.

## Référencement naturel (SEO)

La page Services présente aussi quatre offres commerciales en EN/FR/DE/ES/KM/ZH/JA :
site professionnel multilingue, application métier/API, prototype mobile et
conseil IT/automatisation IA. Chaque offre détaille le public visé, le résultat,
un périmètre proposé et les références pertinentes du portfolio, avec prise de
contact pour un devis personnalisé. Aucun tarif ni délai fixe n'est affiché.
Le contrat doit préciser le périmètre, les critères de réception et les coûts
externes ; les prototypes cités ne sont pas présentés comme des services en production.
L'offre IA reste distincte des références, sans attribuer des fonctions IA non vérifiées
aux projets existants.
L'accueil et Services présentent ChatGPT, Claude et Gemini : capacités générales,
usage pendant le développement, revue humaine et précautions sur les données,
en sept langues. Les fonctionnalités dépendent des versions et abonnements ;
aucun partenariat n'est revendiqué.
La comparaison est présentée dans un tableau à en-têtes accessibles sur ordinateur
et en fiches empilées sur mobile, avec les mêmes informations sans slideshow automatique.
Les icônes locales dans `public/images/ai/`
proviennent de [Lobe Icons](https://github.com/lobehub/lobe-icons), sous licence MIT
conservée dans ce dossier. Les marques restent la propriété de leurs éditeurs.
Les boutons de devis et de contact ciblent le formulaire intégré à cette page
(`#contact`), qui utilise la même API de contact que l'accueil.
Les projets affichent aussi leurs liens directs « Site web » et « Application »
dans le diaporama et sur leur fiche, lorsqu'une destination est renseignée.
Les liens publics vérifiés dans les métadonnées ou README GitHub sont inclus dans
l'instantané du portfolio. Ils complètent uniquement les liens absents des projets
en base correspondant au même dépôt ; les liens personnalisés restent prioritaires.
Aucun domaine n'est déduit du nom du dépôt. La présence d'un lien ne garantit pas
que le service reste disponible et aucun statut de production n'en est déduit.

Les 14 projets ajoutés disposent d'illustrations SVG locales distinctes dans
`public/images/projects/`, montrant leur objet sans prétendre être des captures
d'écran. Elles apparaissent dans le carrousel, les fiches et les données publiques,
y compris lorsque la fiche existante en base n'a pas de couverture.
Une couverture personnalisée reste prioritaire ; aucune mise à jour SQL n'est requise.

L'identité publique associe **Manfred Parbatia**, **Manidev**, le développement web
et **Siem Reap, Cambodge**. Les sept langues disposent de titres et descriptions
spécifiques, d'URL canoniques absolues, de liens `hreflang` réciproques et d'un
`x-default` anglais. L'accueil conserve les réglages anglais personnalisés de
l'administration ; les anciens textes de départ sont remplacés dans les métadonnées
par le nouveau positionnement SEO.

Les pages `/en/services`, `/fr/services`, `/de/services` et `/es/services`
présentent les prestations web, mobile, API, conseil IT et automatisation assistée
par IA, la méthode de travail, les projets locaux et des réponses aux questions
de clients. Elles sont reliées à l'accueil, aux projets et au contact. Leur contenu
est rendu côté serveur, sans attendre une interaction ni une requête navigateur.

Le JSON-LD décrit `Person`, `Organization`, `WebSite`, `ProfilePage`, `Service`,
les projets et les fils d'Ariane, à partir des informations visibles et vérifiables.
Aucun avis, note, prix, horaire ni certification supplémentaire n'est inventé.
Les questions visibles ne sont pas présentées comme éligibles à un résultat
enrichi FAQ Google. L'image Open Graph/Twitter optimisée fait 1200 × 630 pixels.

`/sitemap.xml` liste uniquement les pages publiques canoniques dans les sept
langues, avec leurs variantes et les dates réelles de modification des projets
en base. Aucune date fictive de fraîcheur n'est appliquée à l'accueil.
Le sitemap fonctionne aussi sans base. `/robots.txt` annonce son URL ;
l'administration est `noindex` dans le HTML et les en-têtes HTTP. Elle n'est pas
bloquée dans robots.txt pour permettre aux moteurs de lire cette directive ;
l'authentification continue de protéger les données. L'API est bloquée au crawl
et dispose aussi de `X-Robots-Tag: noindex, nofollow`.

### Mise en ligne et suivi Google

1. Déployer, puis vérifier `NEXT_PUBLIC_SITE_URL` : utiliser la seule URL publique
   principale, actuellement `https://manidev-siem-reap.vercel.app`. Sans variable,
   cette URL de production est utilisée explicitement pour le SEO. Si un domaine
   personnalisé est adopté, changer cette variable puis redéployer et rediriger
   l'ancien domaine vers le principal. Ne pas utiliser une URL de preview.
2. Ajouter le site dans [Google Search Console](https://search.google.com/search-console).
   Une propriété « Préfixe d'URL » convient au domaine Vercel. Pour la validation
   HTML, copier uniquement le jeton dans `GOOGLE_SITE_VERIFICATION`, puis redéployer.
   Pour un domaine personnel, une propriété de domaine peut être validée par DNS.
3. Soumettre `/sitemap.xml` et inspecter l'accueil ainsi que la page de services
   anglaise/française. Demander leur indexation après déploiement.
4. Contrôler le HTML avec l'inspection d'URL et les données structurées avec le
   [Rich Results Test](https://search.google.com/test/rich-results). Le balisage
   valide ne garantit ni résultat enrichi ni classement.
5. Suivre chaque mois les requêtes liées au nom, à Manidev, à Siem Reap et aux
   prestations, les impressions, clics, pages indexées et Core Web Vitals.
   Les liens GitHub/LinkedIn et les liens depuis les projets doivent pointer vers
   le même domaine principal. Obtenir des liens pertinents et consentis depuis
   partenaires/projets et publier des retours d'expérience utiles, sans achats de
   liens ni pages artificielles répétant des villes ou mots-clés.

Une fiche Google Business Profile peut aider si l'activité respecte les conditions
d'éligibilité (contacts clients en personne, adresse ou zone de service conforme).
Ne pas créer une fausse implantation, inventer des avis ou publier une adresse privée
uniquement pour le SEO. L'indexation et les positions restent décidées par Google :
aucun délai ni première place n'est garanti.

Vérifications locales : `npm test`, `npm run lint`, `npm run build`.

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

Renseignez une connexion PostgreSQL dans `.env` ou `.env.local`.
L'application utilise, dans l'ordre, `DATABASE_URL`, `DATABASE_URL_POOLED`,
`POSTGRES_URL`, puis `PRISMA_DATABASE_URL`. Les commandes npm de migration
privilégient `POSTGRES_URL`, puis `DATABASE_URL`, `DATABASE_URL_POOLED` et
`PRISMA_DATABASE_URL`, et transmettent la connexion choisie à Prisma.
Configurez également une vraie URL `NEXT_PUBLIC_SITE_URL` avant le déploiement.
Sans PostgreSQL, laissez toutes ces variables vides : n'utilisez pas une URL fictive
ou les valeurs `USER`, `PASSWORD`, `HOST` et `DATABASE`.

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

## Notifications Gmail du formulaire

Les formulaires de l'accueil et de Services enregistrent le message dans PostgreSQL,
puis envoient une notification SMTP à l'adresse de contact du propriétaire via Gmail,
sans plateforme supplémentaire. L'expéditeur est le compte Gmail authentifié ;
`Reply-To` correspond au visiteur pour lui répondre directement.

1. Activer la validation en deux étapes sur le compte Google.
2. Créer un [mot de passe d'application](https://myaccount.google.com/apppasswords).
   Cette fonction peut être indisponible pour certains comptes ou politiques Google.
3. Configurer dans Vercel (Production), et localement pour les tests :
   `GMAIL_SMTP_USER` (adresse Gmail) et `GMAIL_SMTP_APP_PASSWORD` (les 16 lettres
   du mot de passe d'application). Ne jamais partager ni committer ce secret.
4. Appliquer `npm run db:deploy`, puis redéployer. Le SMTP utilise Gmail sur le
   port 465 avec TLS et vérification de certificat ; aucun serveur mail n'est
   hébergé dans Vercel.

Le succès SMTP indique que Gmail a accepté la notification, pas une garantie de
présence dans la boîte de réception : vérifier aussi les spams et les quotas Gmail.
En cas de configuration absente ou d'échec SMTP, le message reste en base et le
formulaire affiche explicitement que la notification est en attente, sans demander
de soumettre à nouveau. `npm run contact:retry-email` relance jusqu'à 20 notifications
en attente ; relancer pour les lots suivants. Aucun cron automatique n'est configuré.
Une réservation en base limite les envois simultanés ; un échec après acceptation
SMTP mais avant confirmation en base peut entraîner un doublon lors d'une relance
(livraison au moins une fois, pas exactement une fois).
Les anciens messages ne sont pas envoyés rétroactivement.

## Compte administrateur

Après migration de la base, lancez :

```bash
npm run admin:create
```

La commande demande un e-mail et un mot de passe de 16 caractères minimum,
puis stocke un hash scrypt salé. Il n'existe aucun compte ni mot de passe par
défaut dans le code. Relancer la commande pour la même adresse remplace le hash
du mot de passe.

Pour accéder au site déployé, utilisez dans `.env.local` les connexions de
la même base que Vercel, puis lancez `npm run admin:create`. Ouvrez ensuite
<https://manidev-siem-reap.vercel.app/admin> et saisissez l'e-mail et le mot de
passe choisis. La création du compte ne connecte pas automatiquement votre
navigateur. Si les migrations et le seed n'ont pas encore été exécutés sur
cette base, lancez d'abord `npm run db:deploy && npm run db:seed`.

La connexion utilise JavaScript et envoie les identifiants par POST, jamais
dans l'URL, même avant l'hydratation du formulaire. Ne partagez pas le mot de
passe ni la sortie du terminal qui le contient. Si un mot de passe apparaît
dans une URL ou un message, remplacez-le avec `npm run admin:create`.

L'interface se trouve sur `/admin`. Elle permet de créer, modifier, publier,
dépublier, réordonner et supprimer des projets, de gérer leurs catégories,
technologies et liens, de consulter les messages privés, et de modifier les
réglages publics. Les sessions sont stockées côté serveur et utilisent un
cookie `HttpOnly`, `SameSite=Strict`, `Secure` en production. Les mutations
vérifient l'origine et l'utilisateur connecté.

Le menu latéral sépare la vue d'ensemble, la liste et l'éditeur des projets,
les messages, les paramètres, les catégories, les technologies, les compétences,
les expériences et l'explorateur API. Sur mobile, le bouton « Menu admin »
ouvre la navigation. Le menu « Éditeur de projet » permet de reprendre un brouillon
après un changement d'écran ; le bouton « Créer un projet » démarre un nouveau
formulaire et demande confirmation avant d'abandonner les modifications en cours.
Les projets sont recherchables et les messages filtrables par statut.
Le statut « Répondu » ne déclenche pas l'envoi d'un e-mail.
Chaque message dispose d'un bouton « Supprimer » avec confirmation irréversible :
`DELETE /api/v1/admin/messages/{id}` efface réellement la ligne PostgreSQL et son
suivi de notification, sans archivage. La session administrateur et l'origine de
la requête sont vérifiées. Les e-mails déjà envoyés ou en cours d'envoi ne sont
pas rappelés ; la suppression ne concerne que la base de données.

Les ressources publiques sans endpoint d'écriture sont consultées en lecture
seule. L'explorateur couvre tous les endpoints existants : requêtes GET,
filtres, pagination et langues des projets, détail par slug, paramètres publics,
réponses JSON et documentation OpenAPI. Les mutations sont réalisées depuis
les écrans de gestion, jamais par un outil d'envoi arbitraire de requêtes.
L'envoi d'un contact reste dans le formulaire public. Aucun CRUD de comptes,
compétences ou expériences n'est ajouté. Le paramètre `site.locale` est éditable
via l'API existante mais ne change pas la redirection de `/` vers `/en`.

### Cartes de visite

Le menu « Cartes de visite » ouvre un atelier avec coordonnées éditables,
portrait du site remplaçable et import séparé des QR codes WhatsApp/Telegram
(PNG/JPEG/WebP, maximum 5 Mo et 20 millions de pixels). La photo est facultative,
son contour est discret, et des icônes remplacent les noms des messageries sur la carte.
Les images sont normalisées localement en PNG (maximum 700 000 caractères par
data URL, environ 500 Ko par image). Le bouton « Enregistrer en base » conserve
le modèle, ses coordonnées, ses images et ses options dans PostgreSQL ; une copie
peut être créée, chargée, modifiée ou supprimée. Les brouillons non enregistrés
restent perdus au rechargement. Aucun service tiers ne reçoit ces données.
Les modèles appartiennent au compte administrateur connecté et ne sont jamais
exposés par l'API publique. Les routes privées `/api/v1/admin/business-cards`
et `/api/v1/admin/business-cards/{id}` appliquent l'authentification, le contrôle
d'origine pour les écritures et une limite de corps de 2,2 Mo.

Appliquer la migration avant utilisation : `npm run db:deploy` sur la même base
que le déploiement. Elle ajoute la table `BusinessCard` et la compétence IA publiée.
Le seed assure aussi la présence de cette compétence sans écraser les données existantes.
La spécialisation dans l'utilisation de l'IA est présentée dans les sept langues,
et disponible via `/api/v1/skills?locale=fr` (ou `en`, `de`, `es`, `km`, `zh`, `ja`).
La composition utilise `public/images/banniere.png` et un aperçu Canvas,
exporté via jsPDF en PDF A4 portrait : 10 rectos de 85 × 55 mm, deux colonnes
et cinq lignes, espace de 2 mm, repères de découpe facultatifs, sans fond perdu.
Imprimer à 100 %, sans ajustement. Les QR codes sont importés, pas générés :
vérifier leur lisibilité avant impression. Les champs téléphone sont laissés
vides jusqu'à saisie ; aucun numéro n'est inventé.

Les limites de connexion et de formulaire sont stockées dans PostgreSQL sous
forme de clés IP hachées. Le proxy de production doit fournir `x-real-ip` ;
sans base, le limiteur utilise seulement la mémoire du processus. Les règles
persistantes ne remplacent pas un WAF ou une protection anti-abus au niveau du
fournisseur.

## Projets et vérification des informations

Le portfolio présente **18 dépôts distincts** : les quatre projets déjà
publiés et quatorze entrées ajoutées à partir des README, manifestes ou sources
publiques de Manidoux41. Les fiches n'affirment pas qu'un prototype ou un
parcours simulé est un service de production :

- **MMC Go Drivers** — application Flutter/Dart ; distribution mobile non
  vérifiée. Le site associé est
  <https://mmcgodrivers-website.vercel.app/>. Son dépôt web distinct
  **MMC Go Drivers — Public Website** est également listé.
- **La Voix des Enfants Placés — Vienne** — site éditorial Next.js, Prisma et
  PostgreSQL, <https://la-voix-des-enfants-places-vienne.vercel.app/>. Le dépôt
  demande à l'association de valider les contenus et coordonnées.
- **Saiway** — transferts aéroport à Siem Reap et outils par rôle ; dépôt
  Next.js/TypeScript avec Prisma et PostgreSQL,
  <https://gestion-planning-91ve.vercel.app>.
- **KHMERA** — informations et services sur devis pour un séjour ou une
  installation à Siem Reap ; site Next.js multilingue,
  <https://khmera.vercel.app>. Réservation et paiement en ligne ne sont pas
  actifs sur le site public.
- **Voix & Enfance** — initiative publique avec proposition et parcours de
  signature ; formulation à valider avant réutilisation.
- **CV Studio** — éditeur de CV Next.js avec aperçu et export PDF ; stockage
  local SQLite documenté, sans prétention de service multi-utilisateur en
  production.
- **Association Declaration Helper** — outil statique de préparation et
  d'export ; les brouillons restent dans le navigateur et aucun document n'est
  transmis à une administration.
- **Maison douce** (`gestion_planning`) — premier tableau de bord avec données
  de démonstration locales.
- **Nos liens, nos enfants** — ressources sourcées, sondage modéré, statistiques
  et préparation de pétition ; la fiche évite de reprendre les détails
  personnels ou sensibles du dépôt.
- **International CV Collection** — documents et pages de CV HTML statiques,
  pas une application web.
- **Angkor Move (TukTukGo)** — prototype mobile Expo/React Native ; les
  réservations et opérations complètes restent une direction produit, pas un
  service de production revendiqué.
- **Cars Simplon — Driver Mission Client** et son **Backend API Prototype** —
  client mobile Expo et API Express/MongoDB. Le dépôt backend n'avait pas de
  README disponible à la révision vérifiée ; sa fiche se fonde sur le manifeste
  et les modules source.
- **Cars Simplon Drivers** — prototype mobile local. Le README mentionne
  Supabase, mais le tableau de bord et les hooks examinés utilisent SQLite
  local ; aucune intégration distante Supabase n'est revendiquée.
- **TechBoutik** — fork explicite de
  `michaelbaze1987-cloud/test-vs-2` ; la fiche le marque comme fork de
  démonstration. Le paiement est simulé, sans transactions réelles.
- **Route & Schedule Toolkit** (`testapprn`) — application de test sans README,
  décrite uniquement à partir de ses écrans Expo de navigation et de planning.
- **Flutter First App** — modèle de départ du tutoriel Flutter, pas un produit
  publié.

Les quatre sites existants MMC Go Drivers, La Voix, Saiway et KHMERA ont répondu
en HTTP 200 lors de la vérification du 3 novembre 2026. Le dépôt
`Manidev-siem-reap` est le dépôt de ce portfolio lui-même et n'est donc pas
dupliqué comme projet ; le dépôt public `test` était vide et n'a pas de fiche.
Les statuts non confirmés restent explicitement « à confirmer » ; les tests,
forks et prototypes sont signalés dans leurs fiches.

Pour une base de données déjà utilisée, l'ajout des projets est un import
**additif** : `npm run db:seed` insère uniquement les dépôts ou slugs absents et
ne remplace pas les projets existants ni leur contenu éditorial. Les nouveaux
projets sélectionnés sont publiés par le seed : vérifiez leur contenu et la
connexion ciblée avant d'exécuter cette commande. Le seed crée aussi les
paramètres de site et la compétence IA initiale s'ils manquent ; aucune
migration ni seed de production n'est lancé automatiquement.

Une synchronisation facultative importe les dépôts publics du compte configuré :

```bash
npm run github:sync
```

`GITHUB_USERNAME` vaut par défaut `Manidoux41`. La commande pagine l'API
officielle GitHub et déduplique par dépôt, que l'identité existante soit stockée
comme URL GitHub ou comme `repoFullName`. Les nouveaux dépôts non sélectionnés
sont créés comme brouillons « à compléter ». Les synchronisations ultérieures
ne remplacent que les champs de métadonnées GitHub dédiés
(`githubDescription`, `githubLanguage`, étoiles et date de mise à jour), jamais
les textes éditoriaux, images, liens renseignés manuellement ou statut de
publication.

## Images et e-mail

Les visuels présents sans photographie sont des compositions CSS originales,
pas des captures d'écran. Les images de couverture peuvent utiliser un hôte
HTTPS autorisé ; ajoutez uniquement ses noms d'hôte à `IMAGE_HOSTS`
(séparés par des virgules), puis reconstruisez l'application. Next Image
n'autorise que ces hôtes et optimise les images. Les fichiers ne sont pas
téléversés par l'administration : utilisez un stockage objet ou un CDN
compatible et renseignez son URL.

Les messages de contact sont enregistrés dans PostgreSQL et consultables dans
`/admin`, avec l'état de leur notification. Voir « Notifications Gmail du formulaire »
pour activer l'envoi SMTP ; sans configuration, les notifications restent en attente
et le visiteur en est informé.
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
| `POST /api/v1/contact` | Enregistre un message, tente la notification Gmail et retourne `notification: accepted` ou `pending` |
| `POST /api/v1/admin/auth/login` | Ouvre une session administrateur |
| `POST /api/v1/admin/auth/logout` | Ferme une session |
| `/api/v1/admin/projects` | Lecture et création des projets |
| `/api/v1/admin/projects/:id` | Modification et suppression |
| `/api/v1/admin/messages` | Lecture privée des messages |
| `/api/v1/admin/messages/:id` | Mise à jour du statut d'un message |
| `/api/v1/admin/settings` | Lecture et modification des réglages éditoriaux |

Les textes éditoriaux des nouveaux projets sont rédigés en anglais, langue
source par défaut ; les projets sélectionnés disposent de traductions en
français, allemand, espagnol, khmer, chinois simplifié et japonais. Les erreurs de validation utilisent des codes
HTTP explicites. Les messages privés ne sont jamais renvoyés par les routes
publiques. Les URL de projets et de réseaux doivent utiliser HTTPS ; les
couvertures doivent provenir d'un hôte configuré.

## Variables d'environnement

| Variable | Obligatoire | Description |
|---|---:|---|
| `DATABASE_URL` | Si base utilisée | Connexion PostgreSQL explicite, prioritaire pour l'application |
| `DATABASE_URL_POOLED` | Alternative | Connexion PostgreSQL mutualisée pour l'application |
| `POSTGRES_URL` | Alternative | Connexion PostgreSQL privilégiée par les migrations |
| `PRISMA_DATABASE_URL` | Alternative | Prise en charge si URL `postgres://` ou `postgresql://` ; les URL proxy `prisma://` et `prisma+postgres://` nécessitent une connexion PostgreSQL parmi les variables précédentes |
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

Sur Vercel, utilisez **`npm run build`** comme Build Command. Son script
`prebuild` exécute explicitement `prisma generate`, même si les dépendances
sont restaurées depuis le cache. Ne remplacez pas cette commande par
`next build`, qui ignore le script npm.

Pour publier uniquement le portfolio sans PostgreSQL, ne définissez aucune
des quatre variables de connexion dans Vercel et ne lancez ni migrations ni seed. Le site et les
API de lecture utilisent l'instantané public ; Prisma n'est initialisé que
lorsqu'une fonctionnalité accède réellement à une base configurée.
Configurez `NEXT_PUBLIC_SITE_URL=https://manidev-siem-reap.vercel.app`, puis
redéployez. Le formulaire et l'administration restent explicitement
indisponibles dans ce mode.

Avec une base PostgreSQL :

Les variables fournies par votre intégration Vercel sont utilisables directement :
aucun renommage vers `DATABASE_URL` n'est nécessaire. `POSTGRES_URL` doit
pointer vers la même base que `DATABASE_URL_POOLED`. Son nom ne garantit pas
une connexion directe : si elle utilise aussi un pool incompatible avec les
migrations, fournissez une connexion directe dans `POSTGRES_URL`.
Les URL Prisma proxy ne sont pas utilisées pour les migrations.
Ne définissez `PRISMA_DATABASE_URL` qu'une fois.

1. Créez une base PostgreSQL managée (Neon, Supabase ou équivalent) et configurez
   ses variables de connexion (par exemple `POSTGRES_URL` et `DATABASE_URL_POOLED`).
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
