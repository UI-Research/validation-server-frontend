import { parseCookies } from 'nookies';

const COOKIE_TOKEN = 'ui_validation_server_token';
const COOKIE_CSRF = 'csrftoken';

function getCookie(name: string): string | null {
  return parseCookies()[name] || null;
}
function getCsrfToken(): string | null {
  return getCookie(COOKIE_CSRF);
}

export { COOKIE_CSRF, COOKIE_TOKEN, getCookie, getCsrfToken };
