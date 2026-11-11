# Lead form backend

The contact form and the footer newsletter signup both post to a Google Apps Script
web app (`src/lib/forms.ts`). The script adds a row to a Google Sheet and emails
hello@studiomachinga.com with reply-to set to the enquirer.

- Sheet: "Machinga Website Leads"
  https://docs.google.com/spreadsheets/d/1byGRCR_JjRpp0euYQLgNGP9wgjMAh4EPyGL9CIwRxIk/edit
- Script: bound to that sheet (Extensions → Apps Script), project "Machinga Website Leads"
- Deployment: Web app, "Machinga Website Leads v2", deployed 11 Nov 2026
  (the first deployment, ID ending `OnKKlS`, refused anonymous requests and is unused)
  - Execute as: the sheet owner. Who has access: Anyone.
  - Deployment ID: `AKfycbzqK_1UWqf1KXQCnpam-LHCAk4rQEzoTVaM5CHSNXey7uRZjNS3Ku0TQ9TDW-oWeOzX`
  - URL: `https://script.google.com/macros/s/<deployment ID>/exec`

To change the script, edit it in Apps Script, then Deploy → Manage deployments →
edit the existing deployment → Version: New version. That keeps the same URL.
A "New deployment" creates a different URL, which would have to be put in `src/lib/forms.ts`.

Newsletter signups arrive with the name "Newsletter signup" and are labelled
"Newsletter" in the Type column.

## Script source

```javascript
const NOTIFY = 'hello@studiomachinga.com';

function doPost(e) {
  const d = JSON.parse(e.postData.contents || '{}');
  const name = (d.name || '').trim();
  const email = (d.email || '').trim();
  const message = (d.message || '').trim();
  if (!email) return reply({ result: 'error', reason: 'missing email' });

  const type = name === 'Newsletter signup' ? 'Newsletter' : 'Enquiry';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Received', 'Type', 'Name', 'Email', 'Message']);
  }
  sheet.appendRow([new Date(), type, name, email, message]);

  MailApp.sendEmail({
    to: NOTIFY,
    replyTo: email,
    subject: 'Website ' + type.toLowerCase() + ': ' + (name || email),
    body: 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message,
  });
  return reply({ result: 'success' });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```
