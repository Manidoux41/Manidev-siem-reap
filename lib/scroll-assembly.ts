export function assemblyProgress(top: number, height: number, viewport: number) {
  const distance = Math.min(height, viewport) * 0.35 + viewport * 0.12;
  if (distance <= 0) return 1;
  return Math.max(0, Math.min(1, (viewport - top) / distance, (top + height) / distance));
}
