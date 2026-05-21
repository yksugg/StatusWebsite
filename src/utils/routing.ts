/** True when the current URL should render the mock admin panel. */
export function isAdminRoute(pathname = window.location.pathname): boolean {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return normalized === '/admin' || normalized.endsWith('/admin');
}

export function getStorefrontPath(): string {
  const base = import.meta.env.BASE_URL ?? '/';
  if (base === '/') return '/';
  return base.endsWith('/') ? base : `${base}/`;
}
