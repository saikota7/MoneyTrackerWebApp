const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Import the 'path' module for handling file paths
const Transaction = require('./models/transaction');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://kotasai4627:EpJvCIFRnEOMQ1TS@cluster0.th8ujbq.mongodb.net/?retryWrites=true&w=majority`);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Handle GET request for the main page
app.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.render('index', { transactions }); // Use 'index' instead of __dirname + '/views/index.ejs'
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle POST request for adding transactions
app.post('/transactions', async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    const newTransaction = new Transaction({ description, amount, type });
    await newTransaction.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// app.js

const methodOverride = require('method-override'); // Import the 'method-override' middleware

// ... (other imports)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method')); // Enable method-override middleware

// ... (other middleware and routes)

// Handle DELETE request for deleting transactions
app.delete('/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
