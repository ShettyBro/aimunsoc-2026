/**
 * LOCAL LOGIN TEST — mirrors exactly what api/admin/login.js does
 *
 * Usage:
 *   node scripts/test-login.js <username> <password>
 *
 * Example:
 *   node scripts/test-login.js Sudeep MyPassword123
 *
 * Reads DATABASE_URL and JWT_SECRET from .env automatically.
 * No extra packages needed — uses Node built-in fs.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

// ── Load .env from project root manually ─────────────────────────────────────
try {
  const envPath = resolve(process.cwd(), '.env');
  const lines = readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !process.env[key]) process.env[key] = val;
  }
  console.log('  ℹ️  Loaded .env from project root');
} catch {
  console.warn('  ⚠️  No .env file found — using existing environment variables');
}
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function testLogin(username, password) {
  console.log('\n========================================');
  console.log('  ADMIN LOGIN LOCAL TEST');
  console.log('========================================\n');

  // ── Step 1: Check DB connection ───────────────────────────────
  console.log('STEP 1 — Connecting to Neon DB...');
  try {
    await prisma.$connect();
    console.log('  ✅ Connected to Neon DB\n');
  } catch (err) {
    console.error('  ❌ DB connection failed:', err.message);
    process.exit(1);
  }

  // ── Step 2: Count admins in table ─────────────────────────────
  console.log('STEP 2 — Checking Admin table...');
  const total = await prisma.admin.count();
  console.log(`  ℹ️  Total admin records in DB: ${total}`);
  if (total === 0) {
    console.log('  ❌ No admins found in DB. Add an admin first.\n');
    process.exit(1);
  }

  // Show all admins (username only, no hash)
  const allAdmins = await prisma.admin.findMany({ select: { id: true, username: true, lastLogin: true } });
  console.log('  Admin records found:');
  allAdmins.forEach(a => console.log(`    • id="${a.id}"  username="${a.username}"  lastLogin=${a.lastLogin}`));
  console.log();

  // ── Step 3: Find admin by username (case-insensitive) ─────────
  console.log(`STEP 3 — Looking up username: "${username}" (case-insensitive)...`);
  const admin = await prisma.admin.findFirst({
    where: { username: { equals: username, mode: 'insensitive' } },
  });

  if (!admin) {
    console.log(`  ❌ Username "${username}" not found in DB.`);
    console.log('     Check the spelling. Stored usernames are shown above.\n');
    process.exit(1);
  }
  console.log(`  ✅ Found admin: id="${admin.id}"  username="${admin.username}"`);
  console.log(`     Hash prefix in DB: ${admin.passwordHash.slice(0, 20)}...`);
  console.log(`     Hash length: ${admin.passwordHash.length} chars (should be 60)\n`);

  // ── Step 4: Verify bcrypt password ────────────────────────────
  console.log(`STEP 4 — Verifying password with bcrypt.compare...`);
  console.log(`     Password entered: "${password}"`);
  let valid = false;
  try {
    valid = await bcrypt.compare(password, admin.passwordHash);
  } catch (err) {
    console.error(`  ❌ bcrypt.compare threw an error: ${err.message}`);
    process.exit(1);
  }

  if (!valid) {
    console.log('  ❌ PASSWORD DOES NOT MATCH the stored hash.');
    console.log('     → Regenerate the hash with the correct password using:');
    console.log('       node A:\\GitHub\\VTU-FEST_SERVER\\temp-hash.js <correct-password>');
    console.log('     → Then update the passwordHash in Neon DB.\n');
    process.exit(1);
  }
  console.log('  ✅ Password is CORRECT — bcrypt.compare returned true\n');

  // ── Step 5: Sign JWT ──────────────────────────────────────────
  console.log('STEP 5 — Signing JWT token...');
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log('  ❌ JWT_SECRET not set in .env — token cannot be signed.');
    process.exit(1);
  }
  const token = jwt.sign({ id: admin.id, username: admin.username }, secret, { expiresIn: '6h' });
  console.log('  ✅ JWT token generated successfully');
  console.log(`     Token preview: ${token.slice(0, 40)}...`);
  console.log(`     Expires in: 6 hours\n`);

  // ── Result ────────────────────────────────────────────────────
  console.log('========================================');
  console.log('  ✅ LOGIN WOULD SUCCEED — all checks passed');
  console.log('========================================\n');

  await prisma.$disconnect();
}

// ── Entry point ───────────────────────────────────────────────────────────────
const [,, username, password] = process.argv;

if (!username || !password) {
  console.log('\nUsage: node scripts/test-login.js <username> <password>');
  console.log('Example: node scripts/test-login.js Sudeep MyPassword123\n');
  process.exit(1);
}

testLogin(username, password).catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
