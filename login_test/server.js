const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Sample user data (in a real app, use a database)
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if user exists and credentials match (simplified for demo)
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = user; // Store user data in the session
    res.redirect('/dashboard');
  } else {
    res.send('Invalid login credentials');
  }
});

app.get('/dashboard', (req, res) => {
  // Check if the user is authenticated
  if (req.session.user) {
    res.sendFile(__dirname + '/public/dashboard.html');
  } else {
    res.redirect('/');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
