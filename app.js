var express = require('express'),
  mongoose = require('mongoose'),
  app = express();

app.get('/users', function (req, res, next) {
  res.send();
});

app.post('/users', function (req, res, next) {
  res.sendStatus(200);
});

app.get('/posts', function (req, res, next) {
  res.send();
});

app.post('/posts', function (req, res, next) {
  res.sendStatus(200);
});

app.get('/groups', function (req, res, next) {
  res.send();
});

app.post('/groups', function (req, res, next) {
  res.sendStatus(200);
});

app.listen(8000);