export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'http://localhost:8080');

export const TOKEN_EXPIRY = 24 * 60 * 60 * 1000;