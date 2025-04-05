require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const habitRoutes = require('./routes/habitRoutes');

const app = express();
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const goalRoutes = require('./routes/goalRoutes'); 

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/', testRoutes);
app.use('/habits', habitRoutes);
app.use('/public', express.static('public'));
app.use('/goals', goalRoutes); 
app.use(errorHandler);

module.exports = app;
app.listen(3001, '0.0.0.0', () => console.log('🚀 Сервер запущен на порту 3001'));

