// Both site forms post to the "Machinga Website Leads" Apps Script (see docs/lead-form.md).
// It adds a row to the leads sheet and emails hello@studiomachinga.com.
// Sending as text/plain avoids a CORS preflight, which Apps Script does not answer.
const FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzqK_1UWqf1KXQCnpam-LHCAk4rQEzoTVaM5CHSNXey7uRZjNS3Ku0TQ9TDW-oWeOzX/exec';

export async function sendForm(data: Record<string, string>): Promise<void> {
  // fetch() rejects when the request cannot be delivered, so callers can show a real error.
  const response = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Form endpoint answered ${response.status}`);
  // The script answers {"result":"success"} or {"result":"error"}.
  const reply = await response.json().catch(() => null);
  if (reply && reply.result === 'error') throw new Error('Form endpoint rejected the submission');
}
