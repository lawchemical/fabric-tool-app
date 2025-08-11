require('dotenv').config();
const express = require('express');
const { shopifyApi, LATEST_API_VERSION } = require('@shopify/shopify-api');
const { nodeAdapter } = require('@shopify/shopify-api/adapters/node');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

// Fix for Node.js v22+ Shopify API adapter
shopifyApi.adapters = { node: nodeAdapter };

// Shopify API setup
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: ['read_products', 'write_products'],
  hostName: 'localhost',
  apiVersion: LATEST_API_VERSION,
});

// Google Sheets setup (using API key for simplicity)
const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_API_KEY });

app.get('/', (req, res) => {
  res.send('fabric-tool-app is running! Shopify and Google integrations initialized.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Confirm integrations start
  if (shopify) {
    console.log('Shopify API initialized.');
  }
  if (sheets) {
    console.log('Google Sheets API initialized.');
  }
});