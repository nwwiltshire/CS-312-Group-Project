const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5001;

// Cors
app.use(cors());
app.use(bodyParser.json());

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/expenseTracker', { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
const expensesRouter = require('./routes/expenses');
app.use('/expenses', expensesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
