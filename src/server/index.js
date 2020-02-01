const express = require('express');
const app = express();
const challenge = require('./challenge');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 9999;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

challenge();

app.use('/', express.static('dist/public'));

app.get('/api/test', (req, res) => {
  res.send({ someData: { dataHere: 'hello world' } });
});

app.listen(PORT, () => {
  console.log(`rest api running on port: ${PORT}`);
});
