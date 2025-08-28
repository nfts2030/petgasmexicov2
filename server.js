import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Serve the contact.php endpoint
app.post('/api/contact.php', (req, res) => {
  // Spawn a PHP process to handle the request
  const php = spawn('php', [
    '-f',
    path.join(__dirname, 'api', 'contact.php')
  ]);

  // Collect PHP output
  let phpResponse = '';
  let phpError = '';

  php.stdout.on('data', (data) => {
    phpResponse += data.toString();
  });

  php.stderr.on('data', (data) => {
    phpError += data.toString();
  });

  php.on('close', (code) => {
    if (code !== 0) {
      console.error(`PHP process exited with code ${code}`);
      console.error(`PHP Error: ${phpError}`);
      return res.status(500).json({ success: false, message: 'Server error: ' + phpError });
    } else {
      try {
        // Try to parse the PHP response as JSON
        const jsonResponse = JSON.parse(phpResponse);
        res.json(jsonResponse);
      } catch (e) {
        // If it's not JSON, send it as plain text
        res.setHeader('Content-Type', 'application/json');
        res.send(phpResponse);
      }
    }
  });

  // Prepare POST data for PHP
  let postData = '';
  for (const key in req.body) {
    if (postData !== '') postData += '&';
    postData += `${key}=${encodeURIComponent(req.body[key] || '')}`;
  }

  // Send the POST data to PHP
  php.stdin.write(postData);
  php.stdin.end();
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});