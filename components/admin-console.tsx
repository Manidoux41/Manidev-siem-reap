"use client";

import { FormEvent, useRef, useState } from "react";
import { AdminApiBrowser } from "@/components/admin-api-browser";
import { BrandLogo } from "@/components/brand-logo";
import { BusinessCardStudio } from "@/components/business-card-studio";
import { adminSections, type AdminSection } from "@/lib/admin-navigation";

type ProjectStatus = "IN_DEVELOPMENT" | "TEST" | "PRODUCTION" | "UNKNOWN";

export type AdminProject = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  problem: string | null;
  solution: string | null;
  status: ProjectStatus;
  category: string;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  appUrl: string | null;
  coverImage: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
  createdAt: string;
};

type FormValues = Omit<AdminProject, "id">;
export type SiteSettings = {
  "site.title": string;
  "site.description": string;
  "site.locale": string;
  "site.github": string;
  "site.telegram": string;
};
export type AdminConsoleInitialData = {
  projects: AdminProject[];
  messages: ContactMessage[];
  settings: Partial<SiteSettings>;
};

const emptyForm: FormValues = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  problem: "",
  solution: "",
  status: "UNKNOWN",
  category: "Website",
  technologies: [],
  githubUrl: "",
  liveUrl: "",
  appUrl: "",
  coverImage: "",
  featured: false,
  published: false,
  sortOrder: 0,
};

async function readResponse<T>(response: Response): Promise<T> {
  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(body.error ?? "Une erreur est survenue.");
  return body;
}

export function AdminLogin() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setError(false);
    const form = new FormData(event.currentTarget);

    try {
      await readResponse(
        await fetch("/api/v1/admin/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.get("email"),
            password: form.get("password"),
          }),
        }),
      );
      window.location.reload();
    } catch (reason) {
      setError(true);
      setMessage(
        reason instanceof Error ? reason.message : "Connexion impossible.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="admin-card admin-login">
      <p className="eyebrow">Accès sécurisé</p>
      <h2>Connexion</h2>
      <p className="admin-note">
        Utilisez le compte créé avec <code>npm run admin:create</code>.
      </p>
      <noscript>
        <p className="admin-message is-error">
          Activez JavaScript pour vous connecter à l’administration.
        </p>
      </noscript>
      <form
        className="admin-form"
        method="post"
        action="/api/v1/admin/auth/login"
        onSubmit={submit}
      >
        <label>
          E-mail
          <input name="email" type="email" autoComplete="username" required />
        </label>
        <label>
          Mot de passe
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        <button className="button button-dark" type="submit" disabled={busy}>
          {busy ? "Connexion…" : "Se connecter"}
        </button>
      </form>
      <p className={`admin-message${error ? " is-error" : ""}`} role="status">
        {message}
      </p>
    </section>
  );
}

export function AdminConsole({
  initialData,
}: {
  initialData: AdminConsoleInitialData;
}) {
  const [projects, setProjects] = useState<AdminProject[]>(initialData.projects);
  const [messages, setMessages] = useState<ContactMessage[]>(initialData.messages);
  const [settings, setSettings] = useState<SiteSettings>({
    "site.title": "",
    "site.description": "",
    "site.locale": "en",
    "site.github": "https://github.com/Manidoux41",
    "site.telegram": "",
    ...initialData.settings,
  });
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function loadContent() {
    const [projectResponse, messageResponse, settingsResponse] = await Promise.all([
      fetch("/api/v1/admin/projects"),
      fetch("/api/v1/admin/messages"),
      fetch("/api/v1/admin/settings"),
    ]);
    const [projectPayload, messagePayload, settingsPayload] = await Promise.all([
      readResponse<{ data: AdminProject[] }>(projectResponse),
      readResponse<{ data: ContactMessage[] }>(messageResponse),
      readResponse<{ data: Partial<SiteSettings> }>(settingsResponse),
    ]);
    setProjects(projectPayload.data);
    setMessages(messagePayload.data);
    setSettings((current) => ({ ...current, ...settingsPayload.data }));
  }

  function updateField<K extends keyof FormValues>(
    key: K,
    value: FormValues[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function editProject(project: AdminProject) {
    const { id, ...values } = project;
    setEditingId(id);
    setForm(values);
    setFeedback("");
    navigate("editor");
  }

  async function submitProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setFeedback("");
    setError(false);

    const payload = {
      ...form,
      technologies: form.technologies,
      sortOrder: Number(form.sortOrder),
      problem: form.problem || null,
      solution: form.solution || null,
      githubUrl: form.githubUrl || null,
      liveUrl: form.liveUrl || null,
      appUrl: form.appUrl || null,
      coverImage: form.coverImage || null,
    };

    try {
      const response = await fetch(
        editingId
          ? `/api/v1/admin/projects/${encodeURIComponent(editingId)}`
          : "/api/v1/admin/projects",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      await readResponse(response);
      setFeedback(editingId ? "Projet modifié." : "Projet créé.");
      setEditingId(null);
      setForm(emptyForm);
      await loadContent();
      navigate("projects");
    } catch (reason) {
      setError(true);
      setFeedback(
        reason instanceof Error ? reason.message : "Enregistrement impossible.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function deleteProject(project: AdminProject) {
    if (!window.confirm(`Supprimer « ${project.title} » ?`)) return;
    setBusy(true);
    setError(false);
    setFeedback("");
    try {
      await readResponse(
        await fetch(`/api/v1/admin/projects/${encodeURIComponent(project.id)}`, {
          method: "DELETE",
        }),
      );
      setFeedback("Projet supprimé.");
      if (editingId === project.id) {
        setEditingId(null);
        setForm(emptyForm);
      }
      await loadContent();
    } catch (reason) {
      setError(true);
      setFeedback(
        reason instanceof Error ? reason.message : "Suppression impossible.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function changeMessageStatus(
    id: string,
    status: ContactMessage["status"],
  ) {
    setBusy(true);
    setError(false);
    setFeedback("");
    try {
      await readResponse(
        await fetch(`/api/v1/admin/messages/${encodeURIComponent(id)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }),
      );
      await loadContent();
      setFeedback("Statut du message mis à jour.");
    } catch (reason) {
      setError(true);
      setFeedback(
        reason instanceof Error ? reason.message : "Mise à jour impossible.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    setBusy(true);
    setError(false);
    setFeedback("");
    try {
      await readResponse(
        await fetch("/api/v1/admin/auth/logout", { method: "POST" }),
      );
      window.location.reload();
    } catch (reason) {
      setError(true);
      setFeedback(
        reason instanceof Error ? reason.message : "Déconnexion impossible.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");
    setError(false);
    setBusy(true);
    try {
      await readResponse(
        await fetch("/api/v1/admin/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(settings),
        }),
      );
      await loadContent();
      setFeedback("Paramètres enregistrés.");
    } catch (reason) {
      setError(true);
      setFeedback(
        reason instanceof Error ? reason.message : "Enregistrement impossible.",
      );
    } finally {
      setBusy(false);
    }
  }

  const [section, setSection] = useState<AdminSection>("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const [messageStatus, setMessageStatus] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasProjectDraft = editingId !== null || JSON.stringify(form) !== JSON.stringify(emptyForm);
  const unreadCount = messages.filter((item) => item.status === "NEW").length;
  const visibleProjects = projects.filter((item) =>
    `${item.title} ${item.slug} ${item.category}`.toLowerCase().includes(projectSearch.toLowerCase()),
  );
  const visibleMessages = messages.filter((item) => !messageStatus || item.status === messageStatus);
  const sectionTitle = section === "editor" && editingId
    ? "Modifier un projet"
    : adminSections.find((item) => item.id === section)?.label;

  function navigate(next: AdminSection) {
    setSection(next);
    setMenuOpen(false);
    headingRef.current?.focus();
  }

  function createNewProject() {
    if (hasProjectDraft && !window.confirm("Abandonner les modifications du projet en cours et créer un nouveau projet ?")) return;
    setEditingId(null);
    setForm(emptyForm);
    setFeedback("");
    setError(false);
    navigate("editor");
  }

  async function refresh() {
    setBusy(true);
    setError(false);
    setFeedback("");
    try {
      await loadContent();
      setFeedback("Données actualisées.");
    } catch (reason) {
      setError(true);
      setFeedback(reason instanceof Error ? reason.message : "Actualisation impossible.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-workspace">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-heading">
          <BrandLogo />
          <p className="eyebrow">Espace éditeur</p>
          <button type="button" className="admin-menu-toggle" aria-expanded={menuOpen} aria-controls="admin-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "Fermer le menu" : "Menu admin"}
          </button>
        </div>
        <nav id="admin-navigation" className={menuOpen ? "is-open" : ""} aria-label="Tâches d’administration">
          {["Gestion", "Consultation", "Outils"].map((group) => (
            <div className="admin-nav-group" key={group}>
              <p>{group}</p>
              {adminSections.filter((item) => item.group === group).map((item) => (
                <button
                  type="button"
                  key={item.id}
                  aria-current={section === item.id ? "page" : undefined}
                  disabled={busy}
                  onClick={() => navigate(item.id)}
                >
                  {item.id === "editor" && hasProjectDraft ? "Éditeur de projet" : item.label}
                  {item.id === "messages" && unreadCount > 0 && <span className="admin-badge" aria-label={`${unreadCount} nouveaux messages`}>{unreadCount}</span>}
                </button>
              ))}
            </div>
          ))}
          <a href="/en" target="_blank" rel="noreferrer">Voir le site public ↗</a>
          <button type="button" disabled={busy} onClick={logout}>Se déconnecter</button>
        </nav>
      </aside>
      <div className="admin-main">
      <div className="admin-toolbar">
        <h2 ref={headingRef} tabIndex={-1}>{sectionTitle}</h2>
        <button type="button" disabled={busy} onClick={refresh}>{busy ? "En cours…" : "Actualiser les données"}</button>
      </div>
      <p className={`admin-message${error ? " is-error" : ""}`} role="status">
        {feedback}
      </p>
      <div hidden={section !== "business-cards"}>
        <BusinessCardStudio />
      </div>
      {section === "overview" && (
        <section className="admin-card">
          <p className="eyebrow">Votre portfolio en bref</p>
          <div className="admin-stats">
            <button type="button" onClick={() => navigate("projects")}><strong>{projects.length}</strong>Projets</button>
            <button type="button" onClick={() => navigate("projects")}><strong>{projects.filter((item) => item.published).length}</strong>Publiés</button>
            <button type="button" onClick={() => navigate("messages")}><strong>{unreadCount}</strong>Nouveaux messages</button>
          </div>
          <p className="admin-note">
            Créez et gérez les projets, leur publication, leur mise en avant,
            leur ordre, leurs liens et leur couverture. Classez les messages
            reçus et modifiez les paramètres publics du site.
          </p>
          <div className="admin-actions">
            <button type="button" disabled={busy} onClick={createNewProject}>Créer un projet</button>
            <button type="button" onClick={() => navigate("api")}>Explorer l’API</button>
          </div>
          <p className="admin-note">
            Les compétences et expériences sont consultables uniquement :
            aucun endpoint de modification n’existe actuellement. Les catégories
            et technologies sont créées ou associées lors de l’enregistrement des projets.
          </p>
        </section>
      )}
      <section className="admin-card" id="admin-project-form" hidden={section !== "editor"}>
        <p className="eyebrow">{editingId ? "Modifier" : "Nouveau projet"}</p>
        <p className="admin-note">
          Les textes de projet sont saisis en anglais, langue par défaut du site.
        </p>
        <form className="admin-form" onSubmit={submitProject}>
          <div className="form-row">
            <label>
              Titre
              <input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                required
                maxLength={120}
              />
            </label>
            <label>
              Slug
              <input
                value={form.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                required
                maxLength={140}
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              />
            </label>
          </div>
          <label>
            Résumé
            <input
              value={form.shortDescription}
              onChange={(event) =>
                updateField("shortDescription", event.target.value)
              }
              required
              minLength={10}
              maxLength={240}
            />
          </label>
          <label>
            Présentation
            <textarea
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              required
              minLength={20}
              maxLength={10000}
            />
          </label>
          <div className="form-row">
            <label>
              Problématique
              <textarea
                value={form.problem ?? ""}
                onChange={(event) => updateField("problem", event.target.value)}
                maxLength={5000}
              />
            </label>
            <label>
              Solution
              <textarea
                value={form.solution ?? ""}
                onChange={(event) => updateField("solution", event.target.value)}
                maxLength={5000}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Catégorie
              <input
                value={form.category}
                onChange={(event) => updateField("category", event.target.value)}
                required
                maxLength={60}
                list="admin-categories"
              />
              <datalist id="admin-categories">
                {Array.from(new Set(projects.map((item) => item.category))).map((name) => <option key={name} value={name} />)}
              </datalist>
            </label>
            <label>
              Technologies (séparées par des virgules)
              <input
                value={form.technologies.join(", ")}
                onChange={(event) =>
                  updateField(
                    "technologies",
                    event.target.value.split(",").map((item) => item.trim()),
                  )
                }
              />
              <span className="admin-note">Déjà utilisées : {Array.from(new Set(projects.flatMap((item) => item.technologies))).join(", ") || "Aucune"}</span>
            </label>
          </div>
          <div className="form-row">
            <label>
              Statut
              <select
                value={form.status}
                onChange={(event) =>
                  updateField("status", event.target.value as ProjectStatus)
                }
              >
                <option value="UNKNOWN">À confirmer</option>
                <option value="IN_DEVELOPMENT">En développement</option>
                <option value="TEST">En test</option>
                <option value="PRODUCTION">En production</option>
              </select>
            </label>
            <label>
              Ordre d’affichage
              <input
                type="number"
                min={0}
                max={10000}
                value={form.sortOrder}
                onChange={(event) =>
                  updateField("sortOrder", Number(event.target.value))
                }
              />
            </label>
          </div>
          <label>
            URL GitHub (HTTPS)
            <input
              type="url"
              value={form.githubUrl ?? ""}
              onChange={(event) => updateField("githubUrl", event.target.value)}
            />
          </label>
          <div className="form-row">
            <label>
              Site web (HTTPS)
              <input
                type="url"
                value={form.liveUrl ?? ""}
                onChange={(event) => updateField("liveUrl", event.target.value)}
              />
            </label>
            <label>
              Application (HTTPS)
              <input
                type="url"
                value={form.appUrl ?? ""}
                onChange={(event) => updateField("appUrl", event.target.value)}
              />
            </label>
          </div>
          <label>
            Image de couverture (URL HTTPS)
            <input
              type="url"
              value={form.coverImage ?? ""}
              onChange={(event) => updateField("coverImage", event.target.value)}
            />
          </label>
          <div className="admin-checkboxes">
            <label>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) => updateField("featured", event.target.checked)}
              />
              Mis en avant
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => updateField("published", event.target.checked)}
              />
              Publié
            </label>
          </div>
          <div className="admin-actions">
            <button type="submit" disabled={busy}>
              {busy ? "Enregistrement…" : editingId ? "Enregistrer" : "Créer le projet"}
            </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                  navigate("projects");
                }}
              >
                Annuler
              </button>
          </div>
        </form>
      </section>

      <section className="admin-card" hidden={section !== "projects"}>
        <p className="eyebrow">Projets / {projects.length.toString().padStart(2, "0")}</p>
        <div className="admin-form">
          <label>Rechercher un projet
            <input type="search" value={projectSearch} onChange={(event) => setProjectSearch(event.target.value)} />
          </label>
        </div>
        <div className="admin-actions">
          <button type="button" disabled={busy} onClick={createNewProject}>Créer un projet</button>
          <button type="button" onClick={() => navigate("api")}>Consulter les projets publics via l’API</button>
        </div>
        {visibleProjects.length === 0 && <p className="admin-note">Aucun projet correspondant.</p>}
        <ul className="admin-project-list">
          {visibleProjects.map((project) => (
            <li key={project.id}>
              <div>
                <strong>{project.title}</strong>
                <span> · {project.published ? "Publié" : "Brouillon"}</span>
                <p className="admin-note">{project.category} · {project.status} · Ordre {project.sortOrder}{project.featured ? " · Mis en avant" : ""}</p>
                {project.published && <a href={`/en/projects/${encodeURIComponent(project.slug)}`} target="_blank" rel="noreferrer">Voir le projet public</a>}
              </div>
              <div className="admin-actions">
                <button type="button" disabled={busy} onClick={() => editProject(project)}>Modifier</button>
                <button type="button" disabled={busy} onClick={() => deleteProject(project)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-card" hidden={section !== "messages"}>
        <p className="eyebrow">Messages de contact / {messages.length.toString().padStart(2, "0")}</p>
        <p className="admin-note">Les 100 derniers messages reçus. « Répondu » est un classement : cette action n’envoie aucun e-mail.</p>
        <div className="admin-form">
          <label>Filtrer par statut
            <select value={messageStatus} onChange={(event) => setMessageStatus(event.target.value)}>
              <option value="">Tous les messages</option>
              <option value="NEW">Nouveau</option>
              <option value="READ">Lu</option>
              <option value="REPLIED">Répondu</option>
              <option value="ARCHIVED">Archivé</option>
            </select>
          </label>
        </div>
        {visibleMessages.length === 0 ? (
          <p className="admin-note">Aucun message correspondant.</p>
        ) : (
          <ul className="admin-project-list">
            {visibleMessages.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.subject}</strong>
                  <span> — {item.name} · {item.email} · {item.status}</span>
                  <p>{item.message}</p>
                  <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleString("fr-FR", { timeZone: "UTC" })} UTC</time>
                </div>
                <select
                  aria-label={`Statut du message de ${item.name}`}
                  value={item.status}
                  disabled={busy}
                  onChange={(event) =>
                    changeMessageStatus(
                      item.id,
                      event.target.value as ContactMessage["status"],
                    )
                  }
                >
                  <option value="NEW">Nouveau</option>
                  <option value="READ">Lu</option>
                  <option value="REPLIED">Répondu</option>
                  <option value="ARCHIVED">Archivé</option>
                </select>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="admin-card" hidden={section !== "settings"}>
        <p className="eyebrow">Paramètres du site</p>
        <form className="admin-form" onSubmit={saveSettings}>
          <label>
            Titre du site
            <input
              value={settings["site.title"]}
              maxLength={2000}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  "site.title": event.target.value,
                }))
              }
            />
          </label>
          <label>
            Description publique
            <textarea
              value={settings["site.description"]}
              maxLength={2000}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  "site.description": event.target.value,
                }))
              }
            />
          </label>
          <label>
            Langue par défaut (paramètre API)
            <select value={settings["site.locale"]} onChange={(event) => setSettings((current) => ({ ...current, "site.locale": event.target.value }))}>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="es">Español</option>
            </select>
          </label>
          <p className="admin-note">Le paramètre est enregistré dans l’API. L’URL d’accueil reste redirigée vers /en ; les visiteurs choisissent leur langue via le sélecteur.</p>
          <label>
            Lien GitHub public
            <input
              type="url"
              value={settings["site.github"]}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  "site.github": event.target.value,
                }))
              }
            />
          </label>
          <label>
            Lien Telegram public (https://t.me/...)
            <input
              type="url"
              value={settings["site.telegram"]}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  "site.telegram": event.target.value,
                }))
              }
            />
          </label>
          <button type="submit" className="button button-dark" disabled={busy}>{busy ? "Enregistrement…" : "Enregistrer les paramètres"}</button>
        </form>
      </section>
      {(["categories", "technologies", "skills", "experiences", "api"] as AdminSection[]).includes(section) && (
        <AdminApiBrowser
          key={section}
          endpoint={section === "api" ? "/projects" : `/${section}`}
          explorer={section === "api"}
          onNavigate={navigate}
        />
      )}
      </div>
    </div>
  );
}
