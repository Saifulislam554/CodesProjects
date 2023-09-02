const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

module.exports = mongoose.model('Post', postSchema);


// View a specific post
router.get('/:postId', (req, res) => {
  const postId = req.params.postId;

  Post.findById(postId, (err, post) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('post', { post });
    }
  });
});

// Edit a specific post (GET)
router.get('/:postId/edit', (req, res) => {
  const postId = req.params.postId;

  Post.findById(postId, (err, post) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('edit', { post });
    }
  });
});

// Edit a specific post (POST)
router.post('/:postId/edit', (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;

  Post.findByIdAndUpdate(
    postId,
    { title, content },
    { new: true },
    (err, updatedPost) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.redirect('/post/' + updatedPost._id);
      }
    }
  );
});

// Delete a specific post
router.post('/:postId/delete', (req, res) => {
  const postId = req.params.postId;

  Post.findByIdAndRemove(postId, (err) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
