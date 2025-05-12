const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Überprüfe die Umgebung
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Wähle den Port, standardmäßig 3000, aber Passenger setzt möglicherweise PORT
const port = process.env.PORT || 3000;

// Debug-Log für Passenger-Umgebung
if (!dev) {
  console.log('Starting in production mode');
  console.log(`Environment variables: PORT=${process.env.PORT}`);
}

// Prepare the Next.js app und starte den Server
app.prepare()
  .then(() => {
    createServer((req, res) => {
      // Überprüfe auf Passenger-spezifische Header
      if (req.headers['x-forwarded-for']) {
        console.log(`Request received via proxy: ${req.headers['x-forwarded-for']}`);
      }
      
      // Parse die URL
      const parsedUrl = parse(req.url, true);
      
      // Lasse Next.js die Anfrage behandeln
      handle(req, res, parsedUrl);
    }).listen(port, (err) => {
      if (err) {
        console.error('Server error:', err);
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Initialization error:', err);
    process.exit(1);
  });