export function githubRepositoryKey(
  value: string | null | undefined,
): string | null {
  if (!value) return null;

  const input = value.trim();
  if (!input) return null;

  let path = input;
  if (input.includes("://")) {
    try {
      const url = new URL(input);
      if (!["github.com", "www.github.com"].includes(url.hostname.toLowerCase())) {
        return null;
      }
      path = url.pathname;
    } catch {
      return null;
    }
  } else {
    path = path.replace(/^github\.com\//iu, "");
  }

  const parts = path.split("/").filter(Boolean);
  if (parts.length !== 2) return null;
  const [owner, repository] = parts;
  const normalizedRepository = repository.replace(/\.git$/iu, "");
  if (!owner || !normalizedRepository) return null;

  return `${owner}/${normalizedRepository}`.toLowerCase();
}
