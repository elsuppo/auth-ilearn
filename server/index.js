require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/AuthRoutes');
const cookieParcer = require('cookie-parser');

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));

    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log('DB connection successfull');
    });
  } catch (error) {
    console.log(error);
  }
}

start();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));

app.use(cookieParcer())
app.use(express.json());
app.use('/', authRoutes);