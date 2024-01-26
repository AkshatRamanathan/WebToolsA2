const express = require('express');
const app = express();
const session = require('express-session');
const routes = require('./routes');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3000

app.use(cors({ credentials: true, origin: ["http://localhost:5500"] })); //needed to sign header cookies with allowing storing of session from appropriate origin
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('test-secret-hash-key'));
app.use(session({
  secret: 'test-secret-hash-key',
  saveUninitialized: false, //dont create session in memory until modified in API calls
  resave: false, //dont resave in browser until changes
  cookie: {
    maxAge: 1000 * 60 * 5, // 5 minutes
    signed: true, //auth purpose
    httpOnly: true //prevent session cookie meddling in js(browser) to prevent CSRF
  }
}));
app.use('/', express.static('public')); //serving static files here eliminates all CORS hassle
app.use('/survey', routes); //all routes/ middleware

app.listen(port, () => {
  console.log(`Survey app listening on port ${port}`)
})