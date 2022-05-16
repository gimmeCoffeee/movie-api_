const express = require('express');
      morgan = require('morgan');
      movies = require('../movie-api_/topmovies').movies;
      users = require('../movie-api_/topmovies').users;
      uuid = require('uuid');
      bodyParser = require('body-parser');
      mongoose = require('mongoose');

const models = require('.models.js');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my top 10 movies list!');
});

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

app.get('/movies/title/:title', (req, res) => {
    const movie = movies.find((m)=> m.title == req.params.title);
    res.send(movie);
});

app.get('/movies/genre/:genre', (req, res) => {
  const movies_ = movies.filter((m)=> m.genre == req.params.genre);
  res.send(movies_);
});

app.get('/movies/director/:director', (req, res) => {
  const director = movies.filter((m)=> m.director == req.params.director);
  res.send(director);
});

app.post('/users/register', (req, res) => {
  users.push(req.body);
  res.send('Registeration Successful!');
});
app.get('/users', (req, res) => {
  res.send(users);
});

app.put('/users/update/:id', (req, res) => {
    let userId =  users.findIndex((u)=>u.id==req.params.id);
    users.slice(userId,1, {...req.body});
    res.send('Changes saved successfully!');
    res.send(users);
});

app.post('/favourite/add/:id/:title', (req, res) => {
    const user = users.find((u) => u.id ==req.params.id);
    user.favMovies.push(req.body);
    res.send('Movie added to favorites!')
});

app.delete('/favourite/delete/:id/:title', (req, res) => {
  const user = users.find((u) => u.id ==req.params.id);
  const favs = user.favMovies.filter((m)=>m.title != req.params.title)
  user.favMovies = [...favs];
  res.send('Movie has been removed from favorites');
});

app.delete('/users/deregister/:id', (req, res) => {
    users.filter((m) => m.id !=req.params.id);
    res.send('User account successfully removed!')
});
