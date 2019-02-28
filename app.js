
const express = require('express');
const path = require('path');
const hbs = require('hbs');

const beersRouter = require('./routes/beers');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Partials: codigo que se puede reutilizar
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', beersRouter);

// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

app.listen(3000);
