export function getStorefrontPath(): string {
  const base = import.meta.env.BASE_URL ?? '/';
  if (base === '/') return '/';
  return base.endsWith('/') ? base : `${base}/`;
}
