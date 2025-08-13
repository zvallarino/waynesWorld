// pages/api/events.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    const client_email = process.env.GOOGLE_CLIENT_EMAIL;
    const private_key = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
    const spreadsheetId = process.env.SHEET_ID;

    if (!client_email || !private_key || !spreadsheetId) {
      return res.status(500).json({ error: 'Missing required environment variables.' });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email, private_key },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    // Optional but helpful: force token acquisition to surface auth problems here
    await auth.getClient();

    const sheets = google.sheets({ version: 'v4', auth });
    const range = 'Sheet1!A2:F'; // skip header row

    const { data } = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    const rows = data.values || [];

    const events = rows.map((row) => ({
      startDate: row[0] || '',
      endDate: row[1] || '',
      location: row[2] || '',
      time: row[3] || '',
      title: row[4] || '',
      description: row[5] || '',
    }));

    return res.status(200).json(events);
  } catch (err) {
    // Log *only* high-level info in production (avoid leaking secrets)
    console.error('Events API error:', {
      message: err?.message,
      code: err?.code,
      status: err?.status,
      errors: err?.response?.data?.error?.errors,
    });
    // Important: respond with a safe shape so the client doesn’t crash
    return res.status(200).json([]);
  }
}