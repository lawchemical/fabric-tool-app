const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

app.get('/', (req, res) => {
  res.send('Root route is working!');
});

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});

