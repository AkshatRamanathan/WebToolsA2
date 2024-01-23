const express = require('express');
const app = express();
const routes = require('./routes');
const port = 3000

app.use('/', express.static('public'));
app.use('/survey',routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})