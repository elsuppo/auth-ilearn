const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/AuthRoutes');
const cookieParcer = require('cookie-parser');

const PORT = 5000;

const app = express();

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));

    mongoose.set("strictQuery", true);
    await mongoose.connect('mongodb+srv://root:227759@cluster0.8apy0lw.mongodb.net/?retryWrites=true&w=majority', {
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
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(cookieParcer())
app.use(express.json());
app.use('/', authRoutes);