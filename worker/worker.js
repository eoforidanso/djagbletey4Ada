/* ============================================================
   Pledge counter backend — Cloudflare Worker + KV
   ------------------------------------------------------------
   Holds ONE real number: total pledges submitted across every
   visitor, everywhere. The site's app.js calls this instead of
   counting in localStorage, so the public counter stops being a
   per-device tally and starts being an actual total.

   Deploy: see ../README.md → "Making the pledge counter real".
   ============================================================ */

// Only these origins may read/increment the counter. Add a preview
// origin here (e.g. a Netlify/Pages preview URL) if you use one.
const ALLOWED_ORIGINS = new Set([
  'https://djagbletey4ada.com',
  'https://www.djagbletey4ada.com',
  'http://localhost:4173'
]);

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : 'https://djagbletey4ada.com';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function json(data, headers, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (url.pathname === '/count' && request.method === 'GET') {
      const raw = await env.PLEDGES.get('count');
      return json({ count: Number(raw) || 0 }, headers);
    }

    if (url.pathname === '/increment' && request.method === 'POST') {
      // Best-effort increment: KV get-then-put isn't transactional, so two
      // submissions landing in the same instant can rarely undercount by
      // one. Fine for a public pledge counter; not a vote tally.
      const raw = await env.PLEDGES.get('count');
      const count = (Number(raw) || 0) + 1;
      await env.PLEDGES.put('count', String(count));
      return json({ count }, headers);
    }

    return json({ error: 'Not found' }, headers, 404);
  }
};
