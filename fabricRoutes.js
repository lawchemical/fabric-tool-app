const { google } = require('googleapis');
const express = require('express');
const router = express.Router();

// Load service account credentials from Railway secret
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

// Replace with your actual Spreadsheet ID and Sheet Name
const SPREADSHEET_ID = '1jZWC1bl6OmgxImBu1ioYoN2241yoDjvOteUI2bvo2cE';
const SHEET_NAME = 'Sheet1';

// GET /api/fabrics - return all fabrics for dropdowns
router.get('/fabrics', async (req, res) => {
  try {
    // Extend range to include column E (image_url)
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:E`,
    });
    const rows = result.data.values;
    if (!rows || rows.length === 0) return res.status(404).json({ error: 'No fabrics found.' });

    const fabrics = rows.map(row => ({
      name: row[0],
      sku: row[1],
      grade: row[2],
      manufacturer: row[3],
      image_url: row[4] || "" // <-- add image_url from column E
    }));

    res.json({ fabrics });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
