const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

express.static('./public');

app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'views/index'), { title: 'Index'});
});

const port = 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('PS Project Running on port 3000!');
  }
});