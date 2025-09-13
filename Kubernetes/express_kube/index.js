const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Express in Kubernetes!');
});

app.get('/health', (req, res) => {
  res.send('OK');
});

const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.get('/close', (req, res) => {
  res.send('Shutting down the server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});