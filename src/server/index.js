const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 9999;

app.use(bodyParser());
app.use('/', express.static('dist/public'));

app.get('/api/test', (req, res) => {
  res.send({ someData: { dataHere: 'hello world' } });
});

app.listen(PORT, () => {
  console.log(`rest api running on port: ${PORT}`);
});
