const express = require('express');
const app = express();
const session = require('express-session');
const routes = require('./routes');
const port = 3000

app.use('/', express.static('public'));
app.use('/survey', routes);
app.use(session({
  secret: 'test-secret-hash-key',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 5,
    signed: true
  }
}));

app.listen(port, () => {
  console.log(`Survey app listening on port ${port}`)
})