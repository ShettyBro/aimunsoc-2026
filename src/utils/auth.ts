// Client-side JWT token management
const TOKEN_KEY = 'aimunsoc_admin_token';
const USERNAME_KEY = 'aimunsoc_admin_user';
const EXPIRES_KEY = 'aimunsoc_admin_expires';

export interface AdminSession {
  token: string;
  username: string;
  expiresAt: number;
}

/** Save session returned from /api/admin/login */
export function saveSession(token: string, username: string, expiresInMs: number): void {
  const expiresAt = Date.now() + expiresInMs;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(EXPIRES_KEY, String(expiresAt));
}

/** Get stored token — returns null if missing or expired */
export function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const expires = Number(localStorage.getItem(EXPIRES_KEY));
  if (!token || !expires) return null;
  if (Date.now() >= expires) {
    clearSession();
    return null;
  }
  return token;
}

/** Get stored username */
export function getUsername(): string | null {
  return localStorage.getItem(USERNAME_KEY);
}

/** Get ms remaining until expiry — 0 if expired */
export function getMsUntilExpiry(): number {
  const expires = Number(localStorage.getItem(EXPIRES_KEY));
  if (!expires) return 0;
  return Math.max(0, expires - Date.now());
}

/** Check if currently logged in (client-side) */
export function isLoggedIn(): boolean {
  return !!getToken();
}

/** Clear all session data */
export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

/** Build Authorization header for API calls */
export function authHeader(): { Authorization: string } | Record<string, never> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
