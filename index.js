const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to my book club!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

app.get('/books', (req, res) => {
    res.json(topMovies);
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});