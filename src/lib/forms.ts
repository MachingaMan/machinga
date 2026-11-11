// Both site forms post to the same Google Apps Script that the contact form has always used.
// Sending as text/plain avoids a CORS preflight, which Apps Script does not answer.
const FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwnJS-rSkg6w1dFoU-c2zCA6Kts52nmLnc0Z1w38-uJbGjANCbgRcQVVXIcE6cq2dzfXQ/exec';

export async function sendForm(data: Record<string, string>): Promise<void> {
  // fetch() rejects when the request cannot be delivered, so callers can show a real error.
  await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(data),
  });
}
