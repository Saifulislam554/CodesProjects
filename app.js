// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware for parsing JSON data from request body
app.use(bodyParser.json());

// Define a Mongoose schema and model for your data
const schema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', schema);

// Define a route to handle form submissions
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Create a new Contact document
  const contact = new Contact({ name, email, message });

  // Save the document to the database
  contact.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data to the database');
    } else {
      res.status(200).send('Data saved to the database');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
