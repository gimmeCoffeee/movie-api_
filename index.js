const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
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
  Movies.find().then(movies=>{console.log(movies); return res.send(movies) }).catch(err=>{console.log(err); res.send(err) });
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
  Movies.findOne({ Title: req.params.title }).then(movies=>{ return res.send(movies) }).catch(err=>{console.log(err); res.send(err) });
});

app.get('/movies/genre/:genre', (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.genre }).then(movies=>{ return res.send(movies.Genre) }).catch(err=>{console.log(err); res.send(err) });

});

app.get('/movies/director/:director', (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.director }).then(movies=>{ return res.send(movies.Director) }).catch(err=>{console.log(err); res.send(err) });

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
  Users.findOneAndUpdate({ Username: req.params.id }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, 
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

app.post('/favourite/add/:id/:title', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.id }, {
    $push: { FavoriteMovies: req.params.title }
  },
  { new: true }, 
 (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
 });
});

app.delete('/favourite/delete/:id/:title', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.id }, {
    $pull: { FavoriteMovies: req.params.title }
  },
  { new: true },
 (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
 });
});

app.delete('/users/deregister/:id', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.id })
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.id + ' was not found');
    } else {
      res.status(200).send(req.params.id + ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
