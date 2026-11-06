/**
 * Shared between a server component (analytics.tsx, which reads
 * process.env and must stay a server component) and a client component
 * (cookie-consent.tsx). Keeping it in its own plain module - no "use
 * client" - matters: a server component that imports a value straight
 * out of a "use client" module gets a server-side stub instead of the
 * real value, since only components/functions are meant to cross that
 * boundary, not plain data.
 */
export const CONSENT_KEY = "cubicaldot-consent";
