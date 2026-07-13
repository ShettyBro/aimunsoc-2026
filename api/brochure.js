// /api/brochure.js
// Proxy endpoint — fetches the brochure from R2 and streams it back
// with Content-Disposition: attachment so it downloads directly.
// The R2 URL is NEVER sent to the client's browser.

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const r2Base = (process.env.R2_PUBLIC_BASE_URL || '').replace(/\/$/, '');
  const filename = process.env.BROCHURE_FILENAME || "Aicon'26 Brochure Digital File-Compressed.pdf";

  if (!r2Base) {
    return res.status(503).json({ error: 'Brochure not configured.' });
  }

  const r2Url = `${r2Base}/${encodeURIComponent(filename)}`;

  try {
    const upstream = await fetch(r2Url);

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'Brochure unavailable.' });
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.byteLength);
    res.setHeader('Cache-Control', 'public, max-age=3600');

    return res.status(200).send(buffer);
  } catch (err) {
    console.error('Brochure proxy error:', err);
    return res.status(500).json({ error: 'Failed to fetch brochure.' });
  }
}
