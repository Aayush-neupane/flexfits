import { z } from 'zod';

// Lead inbox: set VITE_LEAD_EMAIL to an address you own, open its first
// FormSubmit activation email once, and both forms below deliver for real.
// Until then submissions fail closed with a call-instead message.
const LEAD_EMAIL = (import.meta.env.VITE_LEAD_EMAIL as string | undefined)?.trim();

export const trialSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{6,17}$/, 'Enter a valid phone number.'),
  plan: z.string().min(1),
  billing: z.string().min(1),
  goal: z.string().min(1),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  message: z.string().trim().min(10, 'Tell us a little more (min 10 characters).'),
});

export type TrialLead = z.infer<typeof trialSchema>;
export type ContactLead = z.infer<typeof contactSchema>;

export async function sendLead(
  subject: string,
  fields: Record<string, string>,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!LEAD_EMAIL) {
    return { ok: false, error: 'Form inbox not connected yet — please call (+977) 9862862023.' };
  }
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(LEAD_EMAIL)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...fields,
        _subject: subject,
        _captcha: 'false',
        _honey: '',
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { ok: true };
  } catch {
    return { ok: false, error: 'Could not send just now — please call (+977) 9862862023.' };
  }
}
