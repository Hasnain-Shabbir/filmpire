const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

intent(
  ['What does this app do?', 'What can I do here?', 'What is this app about?'],
  (p) => {
    p.play({ command: 'openInfo' });
    p.play(
      'This is Filmpire, an app where you can find the movies you love. Try saying'
    );
  }
);

const stringifiGenres = genres.map(({ name }) => name.toLowerCase()).join('|');

intent(
  `go to $(GENRE ${stringifiGenres} | to rated | popular | upcoming)`,
  (p) => {
    p.play(`Going to ${p.GENRE.value} category`);
    p.play({ command: 'chooseGenre', genre: p.GENRE.value, genres, p });
  }
);

intent(`Search for $(QUERY* (.*))`, (p) => {
  p.play(`Searching for ${p.QUERY.value}`);
  p.play({ command: 'search', query: p.QUERY.value });
});

intent(["It's Halloween", 'I want to get scared'], (p) => {
  p.play({ command: 'chooseGenre', genre: 'Horror', genres, p });
  p.play(
    "When Witches Go Riding and Black Cats Are Seen: The Moon Laughs and Whispers - It's Halloween"
  );
});

intent('Surprise me', (p) => {
  const selectedCategory =
    genres[Math.floor(Math.random() * genres.length)].name;
  p.play(`Sounds good. Enjoy some ${selectedCategory} movies`);
  p.play({ command: 'chooseGenre', genre: selectedCategory, genres, p });
});

intent(['Give me something funny', 'I want to laugh'], (p) => {
  p.play({ command: 'chooseGenre', genre: 'Comedy', genres, p });
});

intent('Make it dark', (p) => {
  p.play({ command: 'changeMode', mode: 'dark' });
  p.play('Batman likes this, I hope you will as well.');
});
intent('Make it light', (p) => {
  p.play({ command: 'changeMode', mode: 'light' });
  p.play('Ahh, my eyes hurt. Looks good though! I hope you like it.');
});

intent(['Log in', 'Login'], (p) => {
  p.play('Logging you in.');
  p.play({ command: 'login' });
});

intent(['Log out', 'Logout'], (p) => {
  p.play('Logging you out.');
  p.play({ command: 'logout' });
});
