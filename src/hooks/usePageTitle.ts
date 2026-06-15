import { useEffect } from 'react';

const BASE = 'AiCon 2026 | AIMUNSOC';

/**
 * Sets the document <title> for the current page.
 * Usage: usePageTitle('Committees') → "Committees | AiCon 2026 | AIMUNSOC"
 * Usage: usePageTitle() → "AiCon 2026 | AIMUNSOC" (home)
 */
export function usePageTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${BASE}` : BASE;
    return () => {
      document.title = BASE;
    };
  }, [pageTitle]);
}
