'use strict';
// Baseline engagement tracking for the concept. Events go to window.dataLayer (ready for any tag manager) and to
// Vercel Web Analytics custom events when that is enabled on the project. No personal data is collected.
(() => {
  const params = new URLSearchParams(location.search);
  const source = params.get('src') || params.get('utm_source') || (document.referrer ? 'referral' : 'direct');
  const session = (() => { try { const k = 'sf-session'; let v = sessionStorage.getItem(k); if (!v) { v = Math.random().toString(36).slice(2, 10); sessionStorage.setItem(k, v); } return v; } catch { return 'na'; } })();
  window.dataLayer = window.dataLayer || [];
  window.sfTrack = (name, data = {}) => {
    try {
      const event = { event: name, page: location.pathname.replace(/\/$/, '/index'), source, session, ts: Date.now(), ...data };
      window.dataLayer.push(event);
      if (typeof window.va === 'function') window.va('event', { name, data: { page: event.page, source, ...data } });
      if (window.SF_DEBUG || location.hostname === 'localhost' || location.hostname === '127.0.0.1') console.log('[storyframe]', event);
    } catch { /* tracking never breaks the page */ }
  };
  window.sfTrack('page_view', { qr: source === 'qr' });
  // Outbound links: tag them and record the click.
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) window.sfTrack('outbound_click', { href: url.origin + url.pathname, label: (a.dataset.label || a.textContent || '').trim().slice(0, 60) });
  });
})();
