"use client";

import { FormEvent, useEffect, useState } from "react";
import { adminApiEndpoints, type AdminSection } from "@/lib/admin-navigation";

export function AdminApiBrowser({
  endpoint = "/projects",
  explorer = false,
  onNavigate,
}: {
  endpoint?: string;
  explorer?: boolean;
  onNavigate: (section: AdminSection) => void;
}) {
  const [path, setPath] = useState(endpoint);
  const [locale, setLocale] = useState("en");
  const [slug, setSlug] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [url, setUrl] = useState(`/api/v1${endpoint}${endpoint === "/projects" ? "?locale=en&page=1&perPage=50" : ""}`);
  const [revision, setRevision] = useState(0);
  const [result, setResult] = useState<{
    loading: boolean;
    error: string;
    body: unknown;
  }>({ loading: true, error: "", body: null });

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setResult({ loading: true, error: "", body: null });
      try {
        const response = await fetch(url, {
          signal: controller.signal,
          cache: "no-store",
        });
        const body: unknown = await response.json();
        if (!response.ok) {
          const message =
            body && typeof body === "object" && "error" in body &&
            typeof body.error === "string"
              ? body.error
              : `La requête a échoué (HTTP ${response.status}).`;
          throw new Error(message);
        }
        if (!controller.signal.aborted) {
          setResult({ loading: false, error: "", body });
        }
      } catch (reason) {
        if (!controller.signal.aborted) {
          setResult({
            loading: false,
            error: reason instanceof Error ? reason.message : "Lecture impossible.",
            body: null,
          });
        }
      }
    }
    void load();
    return () => controller.abort();
  }, [url, revision]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (["/projects", "/projects/featured", "/projects/{slug}", "/categories"].includes(path)) {
      params.set("locale", locale);
    }
    if (path === "/projects") {
      params.set("page", String(page));
      params.set("perPage", String(perPage));
      if (query.trim()) params.set("q", query.trim());
      if (category.trim()) params.set("category", category.trim());
      if (featured) params.set("featured", featured);
    }
    const resolvedPath = path.replace("{slug}", encodeURIComponent(slug.trim()));
    setUrl(`/api/v1${resolvedPath}${params.size ? `?${params}` : ""}`);
    setRevision((value) => value + 1);
  }

  return (
    <>
      <section className="admin-card">
        <p className="eyebrow">{explorer ? "Explorateur API" : "Consultation API"}</p>
        <p className="admin-note">
          Lecture seule : aucune donnée n’est modifiée ici. Les catégories et
          technologies peuvent être associées aux projets depuis leur éditeur.
          L’API ne propose pas d’édition indépendante des compétences ou expériences.
        </p>
        <form className="admin-form" onSubmit={submit}>
          {explorer && (
            <label>
              Ressource à consulter
              <select value={path} onChange={(event) => { setPath(event.target.value); setPage(1); }}>
                {adminApiEndpoints.filter((item) => item.methods.some((method) => method === "GET")).map((item) => (
                  <option value={item.path} key={item.path}>{item.label}</option>
                ))}
              </select>
            </label>
          )}
          {["/projects", "/projects/featured", "/projects/{slug}", "/categories"].includes(path) && (
            <label>
              Langue des contenus
              <select value={locale} onChange={(event) => setLocale(event.target.value)}>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
              </select>
            </label>
          )}
          {path === "/projects/{slug}" && (
            <label>Slug du projet publié
              <input value={slug} onChange={(event) => setSlug(event.target.value)} required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" />
            </label>
          )}
          {path === "/projects" && (
            <>
              <div className="form-row">
                <label>Recherche
                  <input value={query} onChange={(event) => setQuery(event.target.value)} />
                </label>
                <label>Catégorie (slug)
                  <input value={category} onChange={(event) => setCategory(event.target.value)} />
                </label>
              </div>
              <div className="form-row">
                <label>Mise en avant
                  <select value={featured} onChange={(event) => setFeatured(event.target.value)}>
                    <option value="">Tous</option>
                    <option value="true">Mis en avant</option>
                  </select>
                </label>
                <label>Page
                  <input type="number" min={1} required value={page} onChange={(event) => setPage(Number(event.target.value))} />
                </label>
              </div>
              <label>Résultats par page (1 à 50)
                <input type="number" min={1} max={50} required value={perPage} onChange={(event) => setPerPage(Number(event.target.value))} />
              </label>
            </>
          )}
          <button type="submit" className="button button-dark">Consulter / actualiser</button>
        </form>
        <p className="admin-note">GET <code>{url}</code></p>
        <div aria-live="polite" aria-busy={result.loading}>
          {result.loading ? <p>Chargement…</p> : result.error ? (
            <p className="admin-message is-error" role="alert">{result.error}</p>
          ) : (
            <pre className="admin-api-result" tabIndex={0} aria-label="Réponse JSON de l’API">
              {JSON.stringify(result.body, null, 2)}
            </pre>
          )}
        </div>
      </section>
      {explorer && (
        <section className="admin-card">
          <p className="eyebrow">Toutes les opérations disponibles</p>
          <p className="admin-note">
            Les écritures passent par les écrans de gestion avec leurs validations
            et confirmations. La création et le changement de mot de passe restent
            disponibles uniquement via <code>npm run admin:create</code>.
          </p>
          <a href="/api/v1/openapi" target="_blank" rel="noreferrer">Ouvrir la documentation OpenAPI</a>
          <ul className="admin-api-endpoints">
            {adminApiEndpoints.map((item) => (
              <li key={item.path}>
                <div><strong>{item.methods.join(" / ")}</strong> <code>/api/v1{item.path}</code><p>{item.label}</p></div>
                <button type="button" onClick={() => onNavigate(item.section)}>Ouvrir la tâche</button>
              </li>
            ))}
          </ul>
          <a href="/fr#contact" target="_blank" rel="noreferrer">Ouvrir le formulaire de contact public</a>
        </section>
      )}
    </>
  );
}
