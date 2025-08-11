const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const SPREADSHEET_ID = process.env.SHEET_ID;
const RANGE = 'Fabrics!A2:C';

// Load credentials from the environment variable
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);

app.get('/api/fabrics', async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values || [];
    const fabrics = rows.map(row => ({
      id: row[0],
      name: row[1],
      grade: row[2],
    }));

    res.json(fabrics);
  } catch (error) {
    console.error('Google Sheets API error:', error);
    res.status(500).json({ error: 'Failed to fetch fabrics' });
  }
});

app.listen(PORT, () => {
  console.log(`Fabric API running on port ${PORT}`);
});
