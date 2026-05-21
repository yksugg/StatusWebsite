import { MOCK_STORAGE_KEYS, readJson, removeKey, writeJson } from './storage';

/** Local prototype credentials — not secure; replace with real auth in production. */
export const MOCK_ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password1',
} as const;

type AdminSession = {
  username: string;
  loggedInAt: string;
};

export function isAdminLoggedIn(): boolean {
  return readJson<AdminSession | null>(MOCK_STORAGE_KEYS.adminSession, null) !== null;
}

export function getAdminSession(): AdminSession | null {
  return readJson<AdminSession | null>(MOCK_STORAGE_KEYS.adminSession, null);
}

export function loginAdmin(username: string, password: string): boolean {
  const normalized = username.trim();
  if (
    normalized !== MOCK_ADMIN_CREDENTIALS.username ||
    password !== MOCK_ADMIN_CREDENTIALS.password
  ) {
    return false;
  }
  writeJson(MOCK_STORAGE_KEYS.adminSession, {
    username: normalized,
    loggedInAt: new Date().toISOString(),
  } satisfies AdminSession);
  return true;
}

export function logoutAdmin(): void {
  removeKey(MOCK_STORAGE_KEYS.adminSession);
}
