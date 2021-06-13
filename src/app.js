const path = require('path');
const fs = require('fs');
const express = require('express');
const { ap } = require('ramda');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true}));

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

app.get('/transfer', (req, res) => {
  res.render('transfer');
})

app.post('/transfer', (req, res) => {
  accounts[req.body.from].balance -= req.body.amount;
  accounts[req.body.to].balance += parseInt(req.body.amount, 10);

  let accountsJSON = JSON.stringify(accounts, null, 3);
  fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON, 'UTF-8');

  res.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
})

app.post('/payment', (req, res) => {
  accounts.credit.balance -= req.body.amount;
  accounts.credit.available += parseInt(req.body.amount, 10);

  let accountsJSON = JSON.stringify(accounts, null, 3);
  fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON, 'UTF-8');

  res.render('payment', { message: 'Payment Successful', account: accounts.credit });
})

const port = 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('PS Project Running on port 3000!');
  }
});