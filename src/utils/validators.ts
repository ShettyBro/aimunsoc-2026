/**
 * Shared form validators — used by both IndividualForm and DelegationForm
 */

// ── Disposable / fake email domains to block ─────────────────────────────────
const BLOCKED_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', 'guerrillamail.com', 'throwaway.email',
  'fakeinbox.com', 'yopmail.com', 'trashmail.com', 'dispostable.com',
  'sharklasers.com', 'guerrillamailblock.com', 'grr.la', 'guerrillamail.info',
  'maildrop.cc', 'spamgourmet.com', 'trashmail.at', 'trashmail.me',
  'getairmail.com', 'filzmail.com', 'temp-mail.org', 'discard.email',
  'spamhereplease.com', 'mytemp.email', 'fakemailgenerator.com', 'tempinbox.com',
  'mail-temp.com', 'tempr.email', 'disbox.net', 'spamfree24.org',
  'getnada.com', 'spamgrap.com', 'crazymailing.com', 'tempemail.co',
]);

// ── Full Name ─────────────────────────────────────────────────────────────────
export function validateFullName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return 'Full name is required.';
  if (trimmed.length < 3) return 'Name must be at least 3 characters.';
  if (trimmed.length > 80) return 'Name must be under 80 characters.';
  if (/\d/.test(trimmed)) return 'Name must not contain numbers.';
  if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return 'Name must contain only letters, spaces, hyphens or dots.';
  if (trimmed.split(/\s+/).length < 2) return 'Please enter your full name (first and last name).';
  return '';
}

// ── Age ───────────────────────────────────────────────────────────────────────
export function validateAge(age: string): string {
  const trimmed = age.trim();
  if (!trimmed) return 'Age is required.';
  if (!/^\d+$/.test(trimmed)) return 'Age must be a valid number.';
  const n = parseInt(trimmed, 10);
  if (n < 18) return 'You must be at least 18 years old to register.';
  if (n > 80) return 'Please enter a valid age.';
  return '';
}

// ── Institution / College ─────────────────────────────────────────────────────
export function validateInstitution(inst: string): string {
  const trimmed = inst.trim();
  if (!trimmed) return 'Institution name is required.';
  if (trimmed.length < 4) return 'Please enter the full institution name (min 4 characters).';
  if (/^\d+$/.test(trimmed)) return 'Institution name must contain letters.';
  return '';
}

// ── Email ─────────────────────────────────────────────────────────────────────
export function validateEmail(email: string): string {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return 'Email address is required.';

  // Basic format check (stricter than just \S+@\S+\.\S+)
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return 'Please enter a valid email address.';

  // No leading/trailing dots or double dots
  const [local, domain] = trimmed.split('@');
  if (local.startsWith('.') || local.endsWith('.')) return 'Invalid email format.';
  if (local.includes('..')) return 'Invalid email format.';
  if (domain.startsWith('.') || domain.endsWith('.')) return 'Invalid email domain.';

  // Block disposable domains
  const domainBase = domain.split('.').slice(-2).join('.');
  if (BLOCKED_DOMAINS.has(domain) || BLOCKED_DOMAINS.has(domainBase)) {
    return 'Disposable/temporary email addresses are not allowed.';
  }

  // Block obviously fake patterns like test@test.com, abc@abc.abc
  if (/^(test|fake|dummy|sample|example|noemail|null|none)@/.test(trimmed)) {
    return 'Please enter your real email address.';
  }
  if (local === domain.split('.')[0]) return 'Please enter a valid email address.';

  return '';
}

// ── Indian Mobile Phone ───────────────────────────────────────────────────────
export function validateIndianPhone(phone: string): string {
  if (!phone.trim()) return 'Phone number is required.';

  // Strip country code (+91, 0091, 91) and spaces/dashes
  let digits = phone.trim().replace(/[\s\-().+]/g, '');
  if (digits.startsWith('0091')) digits = digits.slice(4);
  else if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);

  if (digits.length !== 10) return 'Phone number must be exactly 10 digits.';
  if (!/^\d{10}$/.test(digits)) return 'Phone number must contain only digits.';

  // Indian mobile numbers start with 6, 7, 8, or 9 (TRAI standard)
  if (!/^[6-9]/.test(digits)) return 'Enter a valid Indian mobile number (must start with 6, 7, 8 or 9).';

  // Reject obviously fake repeated numbers
  if (/^(\d)\1{9}$/.test(digits)) return 'Please enter a real phone number.';

  return '';
}

// ── City ──────────────────────────────────────────────────────────────────────
export function validateCity(city: string): string {
  const t = city.trim();
  if (!t) return 'City is required.';
  if (t.length < 2) return 'Enter a valid city name.';
  if (/^\d+$/.test(t)) return 'City name must contain letters.';
  return '';
}

// ── Delegate Count ────────────────────────────────────────────────────────────
export function validateDelegateCount(count: string): string {
  const n = parseInt(count, 10);
  if (!count) return 'Number of delegates is required.';
  if (isNaN(n) || n < 12) return 'Delegation must have at least 12 delegates.';
  if (n > 200) return 'Please enter a valid delegate count.';
  return '';
}

// ── Transaction ID ────────────────────────────────────────────────────────────
export function validateTransactionId(txId: string): string {
  const t = txId.trim();
  if (!t) return 'Transaction ID is required.';
  if (t.length < 6) return 'Transaction ID must be at least 6 characters.';
  if (t.length > 100) return 'Transaction ID seems too long.';
  if (/^(0+|null|undefined|na|n\/a|test|xxx)$/i.test(t)) return 'Please enter a valid Transaction ID.';
  return '';
}
