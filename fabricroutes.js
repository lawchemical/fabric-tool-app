const { google } = require('googleapis');
const express = require('express');
const fs = require('fs');
const router = express.Router();

// Load service account credentials
const credentials = JSON.parse(fs.readFileSync('service-account.json'));

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

// Replace with your actual Spreadsheet ID and Sheet Name
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Sheet1';

// GET /api/fabrics - return all fabrics for dropdowns
router.get('/fabrics', async (req, res) => {
  try {
    // Reads all rows after the header (A2:D for columns Fabric Name, Sku/Code, Grade, Manufacturer)
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:D`,
    });
    const rows = result.data.values;
    if (!rows || rows.length === 0) return res.status(404).json({ error: 'No fabrics found.' });

    // Map each row to a fabric object
    const fabrics = rows.map(row => ({
      name: row[0],
      sku: row[1],
      grade: row[2],
      manufacturer: row[3]
    }));

    res.json({ fabrics });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
