const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const movies = require('../movie-api_/topmovies').movies;
const users = require('../movie-api_/topmovies').users;
const uuid = require('uuid');
const bodyParser = require('body-parser');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb+srv://GimmeCoffeee:20fIRE!22pLACE@cluster0.uvfl6.mongodb.net/MoviesDB', { useNewUrlParser: true, useUnifiedTopology: true });

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
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.get('/users', (req, res) => {
  Users.find().then(users=>{console.log(users); return res.send(users) }).catch(err=>{console.log(err); res.send(err) })
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
