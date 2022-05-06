const express = require('express');
      morgan = require('morgan');
      movies = require('../movie-api_/topmovies')

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to my top 10 movie list!');
});

app.use(express.static('public'));

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

app.get('/movies', (req, res) => {
    res.json(movies);
  });

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});