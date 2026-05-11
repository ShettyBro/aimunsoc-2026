import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '6h';

if (!JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET not set — admin auth will not work.');
}

/**
 * Sign a JWT token for an admin user.
 * @param {object} payload - { id, username }
 * @returns {string} signed JWT
 */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify and decode a JWT token.
 * Throws if invalid or expired.
 */
export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

/**
 * Extract Bearer token from Authorization header.
 */
export function extractToken(req) {
  const auth = req.headers?.authorization || req.headers?.Authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return auth.slice(7);
}

/**
 * Middleware-style helper: validates JWT from request.
 * Returns decoded payload on success.
 * Sends 401 and returns null on failure.
 */
export function requireAuth(req, res) {
  if (!JWT_SECRET) {
    res.status(500).json({ success: false, message: 'JWT_SECRET not configured on server.' });
    return null;
  }

  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ success: false, message: 'Unauthorized — no token provided.' });
    return null;
  }

  try {
    return verifyToken(token);
  } catch (err) {
    const message =
      err.name === 'TokenExpiredError'
        ? 'Session expired — please log in again.'
        : 'Invalid token — please log in again.';
    res.status(401).json({ success: false, message, expired: err.name === 'TokenExpiredError' });
    return null;
  }
}
