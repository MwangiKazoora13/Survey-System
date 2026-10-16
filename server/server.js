const http = require('http');
const url = require('url');
const port = 3000;
const db= require('./createDB');
const cors = require('cors');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
      // Handle preflight request for CORS
      handleCorsHeaders(req, res);
      res.statusCode = 200;
      res.end();
    } else {
const { pathname } = url.parse(req.url);
handleCorsHeaders(req, res);

if (pathname === '/') {
  // Serve the HTML file
  fs.readFile('./index.html', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
} else if (pathname === '/api/submit' && req.method === 'POST') {
  // Handle form submission
  handleFormSubmission(req, res);
} else {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}
}
});

function handleFormSubmission(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { company_name, company_email, number, location, recommendation, services, comment } = JSON.parse(body);
    console.log('Received services:', services);
    //collect information from the frontend and put in the database
      db.run(
      `INSERT INTO user_answers (company_name, company_email, number, location, recommendation, services, comment) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [company_name, company_email, number, location, recommendation, services, comment],
      function (err) {
        if (err) {
          console.error('Data insertion error:', err.message);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Error saving data to the database.' }));
        } else {
          console.log('Data inserted with ID:', this.lastID);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Data saved successfully!' }));
        }
      }
    );
  });
}

  function handleCorsHeaders(req, res) {
    // Use the cors middleware
    cors()(req, res, () => {});
  }

server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});