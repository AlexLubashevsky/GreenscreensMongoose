const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');
const mongoose = require('mongoose');

const port = 3000;

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://localhost:27017/greenscreens', { useUnifiedTopology: true });

const feedSchema = mongoose.Schema({
  name: String,
  email: String,
  feed: String
});

const FeedModal = mongoose.model('feeds', feedSchema);

app.get('/', function(req, res) {
  res.render('feedback_form');
});

app.post('/feedback_form', function(req, res) {
  const feedData = new FeedModal({
    name: req.body.name,
    email: req.body.email,
    feed: req.body.feedback
  });

  feedData.save()
    .then(data => {
      res.render('feedback_form', { msg: 'Your feedback successfully saved.' });
    })
    .catch(err => {
      res.render('feedback_form', { msg: 'Check Details.' });
    });
});

app.listen(port, () => {
  console.log('Server is running');
});