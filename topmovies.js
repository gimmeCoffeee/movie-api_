let users = [
    {
      id:1,
      fullname: 'John Doe',
      email: 'johndoe@mail.com',
      favMovies: [{
        "title": "The Devil Wears Prada",
        "director": "David Frankel",
        "release": "2006"
      }]
    },
    {
      id:2,
      fullname: 'Jane Doe',
      email: 'janedoe@mail.com',
      favMovies: [{
        "title": "Harry Potter and the Half Blood Prince",
        "director": "David Yates",
        "release": "2009"
      }]
    }
  
  ];
    let movies = [
        {
            "title": "Harry Potter and the Half Blood Prince",
            "director": "David Yates",
            "release": "2009"
        },
        {
            "title": "The Hunger Games; Catching Fire",
            "director": "Francis Lawrence",
            "release": "2013"
        },
        {
            "title": "The Devil Wears Prada",
            "director": "David Frankel",
            "release": "2006"
        },
        {
            "title": 'White Oleander',
            "director": "Peter Kosminsky",
            "release": "2002"
        },
        {
            "title": "The Girl with the Dragon Tattoo",
            "director": "David Fincher",
            "release": "2011"
        },
        {
            "title": "Dune",
            "director": "Denis Villenueve",
            "release": "2021"
        },
        {
            "title": "Divergent",
            "director": "Neil Burger",
            "release": "2014"
        },
        {
            "title": "The NeverEnding Story",
            "director": "Wolfgang Peterson",
            "release": "1984"
        },
        {
            "title": "The Sound of Music",
            "director": "Robert Wise",
            "release": "1965"
        },
        {
            "title": "Maleficent",
            "director": "Robert Stromberg",
            "release": "2014"
        }
    ];

    module.exports = {
        users,
        movies
    }