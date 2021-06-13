const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));

const accountData = fs.readFileSync(path.join(__dirname, '/json/accounts.json'), 'UTF-8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, '/json/users.json'), 'UTF-8');
const users = JSON.parse(userData);

app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary', accounts: accounts });
});

app.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings });
});

app.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking });
});

app.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit });
});

app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] });
});

const port = 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('PS Project Running on port 3000!');
  }
});