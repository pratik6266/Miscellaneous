const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname);

const host = process.env.HOST || 'localhost';
const portDB = process.env.PORTDB || 27017;

mongoose.connect(`mongodb://${host}:${portDB}/db`);

mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

const mongoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const User = mongoose.model('User', mongoSchema);

const port = 3000;

app.post('/update', async (req, res) => {
  try {
    const name = req.body.name;
    const newUser = new User({ name });
    await newUser.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error saving user');
  }
});

app.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('index', { users });
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

const server = app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

app.get('/close', (req, res) => {
  res.send('Closing server...');
  server.close(() => {
    console.log('Server closed via /close');
    process.exit(0);
  });
});

// Handle Kubernetes SIGTERM
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed due to SIGTERM');
    process.exit(0);
  });
});
