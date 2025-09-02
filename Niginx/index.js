import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const name = process.env.APP_NAME

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  console.log(`Served to ${name}`);
});

app.listen(3000, () => {
  console.log(`${name} is running on http://localhost:3000`);
});