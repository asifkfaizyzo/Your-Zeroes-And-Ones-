// lib/validate.js
export function sanitizeString(input, maxLength = 1000) {
  if (typeof input !== 'string') return '';
  return input.trim().substring(0, maxLength);
}

export function sanitizeSlug(input) {
  if (typeof input !== 'string') return '';
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 200);
}

export function sanitizeHtml(html) {
  if (typeof html !== 'string') return '';
  // Basic script tag removal - for full sanitization use DOMPurify on client
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateUUID(id) {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(id);
}
// Replace validateUUID with validateCUID
export function validateCUID(id) {
  if (!id || typeof id !== 'string') return false;
  // CUID starts with 'c' and is 25 characters
  return /^c[a-z0-9]{24}$/.test(id);
}

export function validateInt(value) {
  const num = parseInt(value, 10);
  return !isNaN(num) && isFinite(num);
}

export function parseIntSafe(value, defaultValue = 0) {
  const num = parseInt(value, 10);
  return isNaN(num) ? defaultValue : num;
}