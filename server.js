const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Add CORS middleware at the very top, before routes
const cors = require('cors');
app.use(cors({
  origin: 'https://americanmillsoutdoor.com' // or '*' for testing
}));

// Import your fabric routes
const fabricRoutes = require('./fabricRoutes');
app.use('/api', fabricRoutes);

// Optional: Basic test/root routes for debugging
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

app.get('/', (req, res) => {
  res.send('Root route is working!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
