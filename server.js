import express from 'express';
import { join } from 'path';

const app = express();

// Define the directory to serve static files from
const staticDir = path.join(__dirname, 'r');

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Serve static files from the 'r' directory
app.use(express.static(staticDir));


// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Define the port number
const PORT = process.env.PORT || 4000;

app.get('/cloud.js', (req, res) => {
  res.send('./r/metadata.json')
})
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

