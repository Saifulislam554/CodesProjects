const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

// Configure mongoose and connect to your MongoDB instance

// Configure mongoose and connect to your MongoDB instance
mongoose.connect('mongodb:// 127.0.0.1:27017/blogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import the Post model
const Post = require('models/post');

// 
// Rest of your code...

// Define a schema for your Post model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Create a Post model using the schema

// Create and save a sample post document to the database
const newPost = new Post({
  title: 'Sample Post',
  content: 'This is a test post.',
});

newPost.save()
  .then(() => console.log('Document inserted'))
  .catch((error) => console.error(error));

app.use(express.json());

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const homeRoute = require('./routes/home');
const postRoute = require('./routes/post');
const editRoute = require('./routes/edit');

app.use('/', homeRoute);
app.use('/post', postRoute);
app.use('/edit', editRoute);

// Start the server
const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
