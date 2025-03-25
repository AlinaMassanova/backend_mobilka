require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on ${PORT}`));

module.exports = app;
