let users = [
    {
      id: 1,
      fullname: 'John Doe',
      email: 'johndoe@mail.com',
      favMovies: [{
        "title": "The Devil Wears Prada",
        "director": "David Frankel",
        "release": "2006",
        "genre": "Comedy/Drama"
      }]
    },
    {
      id: 2,
      fullname: 'Jane Doe',
      email: 'janedoe@mail.com',
      favMovies: [{
        "title": "Harry Potter and the Half Blood Prince",
        "director": "David Yates",
        "release": "2009",
        "genre": "Fantasy/Adventure"
      }]
    }
  
  ];
    let movies = [
        {
            "title": "Harry Potter and the Half Blood Prince",
            "director": "David Yates",
            "release": "2009",
            "genre": "Fantasy/Adventure"
        },
        {
            "title": "The Hunger Games: Catching Fire",
            "director": "Francis Lawrence",
            "release": "2013",
            "genre": "Sci-Fi"
        },
        {
            "title": "The Devil Wears Prada",
            "director": "David Frankel",
            "release": "2006",
            "genre": "Comedy/Drama"
        },
        {
            "title": 'White Oleander',
            "director": "Peter Kosminsky",
            "release": "2002",
            "genre": "Drama"
        },
        {
            "title": "The Girl with the Dragon Tattoo",
            "director": "David Fincher",
            "release": "2011",
            "genre": "Thriller/Mystery"
        },
        {
            "title": "Dune",
            "director": "Denis Villenueve",
            "release": "2021",
            "genre": "Sci-Fi"
        },
        {
            "title": "Divergent",
            "director": "Neil Burger",
            "release": "2014",
            "genre": "Sci-Fi"
        },
        {
            "title": "The NeverEnding Story",
            "director": "Wolfgang Peterson",
            "release": "1984",
            "genre": "Fantasy"
        },
        {
            "title": "The Sound of Music",
            "director": "Robert Wise",
            "release": "1965",
            "genre": "Musical"
        },
        {
            "title": "Maleficent",
            "director": "Robert Stromberg",
            "release": "2014",
            "genre": "Fantasy/Adventure"
        }
    ];

    module.exports = {
        users,
        movies
    }