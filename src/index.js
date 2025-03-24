require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => console.log(`Serving is running on ${PORT}`));
