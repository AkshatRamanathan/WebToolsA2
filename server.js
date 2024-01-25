const express = require('express');
const app = express();
const session = require('express-session');
const routes = require('./routes');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3000

app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5500' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('test-secret-hash-key'));
app.use(session({
  secret: 'test-secret-hash-key',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 5,
    signed: true,
  }
}));
app.use('/', express.static('public'));
app.use('/survey', routes);

app.listen(port, () => {
  console.log(`Survey app listening on port ${port}`)
})