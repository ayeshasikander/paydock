/**
 * Demo / third-party integration mode.
 * Set NEXT_PUBLIC_USE_MOCK_DATA=true in .env.local for demo (mock APIs, no disk webhook DB).
 * Omit or set false for real webhook persistence (lowdb) and live-style APIs.
 */
export function isMockDemo(): boolean {
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";
}
