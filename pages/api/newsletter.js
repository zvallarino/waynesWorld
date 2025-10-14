// pages/api/newsletter.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const client_email = process.env.GOOGLE_CLIENT_EMAIL;
    const private_key = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
    const spreadsheetId = process.env.NEWSLETTER_SHEET_ID; // New env variable

    if (!client_email || !private_key || !spreadsheetId) {
      return res.status(500).json({ error: 'Missing required environment variables.' });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email, private_key },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    await auth.getClient();

    const sheets = google.sheets({ version: 'v4', auth });

    // Check for duplicate email
    const checkRange = 'Sheet1!C2:C'; // Column C contains emails
    const { data: existingData } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: checkRange,
    });

    const existingEmails = (existingData.values || []).map(row => row[0]?.toLowerCase());
    
    if (existingEmails.includes(email.toLowerCase())) {
      return res.status(200).json({ 
        success: true, 
        message: 'Email already subscribed',
        duplicate: true 
      });
    }

    // Add new row
    const dateAdded = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const newRow = [firstName, lastName, email, message || '', dateAdded];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A2:E',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [newRow],
      },
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter',
      duplicate: false 
    });

  } catch (err) {
    console.error('Newsletter API error:', {
      message: err?.message,
      code: err?.code,
      status: err?.status,
      errors: err?.response?.data?.error?.errors,
    });
    return res.status(500).json({ 
      error: 'Failed to process newsletter signup',
      success: false 
    });
  }
}