import { Movie } from "../../models/index.js";

class MoviesSeeder {
  static async seed() {
    const moviesData = [
      {
        title: "Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
        genre: "Fantasy",
        synopsis:
          "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
        movieImageUrl: "https://m.media-amazon.com/images/I/A1yy50fuVnL._RI_.jpg",
      },

      {
        title: "Lord of the Rings: The Two Towers",
        year: 2002,
        genre: "Fantasy",
        synopsis:
          "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
        movieImageUrl:
          "https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      },

      {
        title: "Lord of the Rings: The Return of the King",
        year: 2003,
        genre: "Fantasy",
        synopsis:
          "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        movieImageUrl:
          "https://upload.wikimedia.org/wikipedia/en/b/be/The_Lord_of_the_Rings_-_The_Return_of_the_King_%282003%29.jpg",
      },
      {
        title: "Inception",
        year: 2010,
        genre: "Sci-Fi",
        synopsis:
          "A skilled thief is tasked with planting an idea into the mind of a CEO by entering his dreams, but he faces unexpected challenges as the line between reality and dreams becomes blurred.",
        movieImageUrl:
          "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/7dfddd911b8040729896c5be83f8e139_6e2f4149-8cb4-414c-a33b-9e0065c55af3_480x.progressive.jpg?v=1573585216",
      },

      {
        title: "The Shawshank Redemption",
        year: 1994,
        genre: "Drama",
        synopsis:
          "A banker is sentenced to life in Shawshank State Penitentiary for the murder of his wife, where he forms an unlikely friendship with a fellow inmate and finds hope through acts of integrity.",
        movieImageUrl: "https://m.media-amazon.com/images/I/51KjbtEkoeL._AC_.jpg",
      },
      {
        title: "Pulp Fiction",
        year: 1994,
        genre: "Crime",
        synopsis:
          "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        movieImageUrl: "https://i.ebayimg.com/images/g/1uQAAOSw0wZjDeRh/s-l1600.jpg",
      },

      {
        title: "The Dark Knight",
        year: 2008,
        genre: "Action",
        synopsis:
          "Batman sets out to dismantle the remaining criminal organizations in Gotham City with the help of Lieutenant James Gordon and the district attorney, but they face a psychopathic criminal known as the Joker.",
        movieImageUrl: "https://m.media-amazon.com/images/I/51rF2-tvXVL._AC_.jpg",
      },
      {
        title: "Fight Club",
        year: 1999,
        genre: "Drama",
        synopsis:
          "An insomniac office worker and a soap salesman form an underground fight club as a form of male bonding, but it spirals out of control as their activities become more dangerous.",
        movieImageUrl: "https://m.media-amazon.com/images/I/81D+KJkO4SL._AC_SY879_.jpg",
      },

      {
        title: "Star Wars: Episode IV - A New Hope",
        year: 1977,
        genre: "Sci-Fi",
        synopsis:
          "Luke Skywalker, a young farm boy on the desert planet of Tatooine, embarks on a journey to rescue Princess Leia from the clutches of the evil Darth Vader and help the Rebel Alliance in their fight against the Galactic Empire.",
        movieImageUrl: "https://m.media-amazon.com/images/I/81P3lDJbjCL._AC_SY879_.jpg",
      },

      {
        title: "Star Wars: Episode V - The Empire Strikes Back",
        year: 1980,
        genre: "Sci-Fi",
        synopsis:
          "After the destruction of the Death Star, the Rebel Alliance faces new challenges as they are pursued across the galaxy by Darth Vader and the Imperial forces, while Luke Skywalker trains with Jedi Master Yoda.",
        movieImageUrl: "https://m.media-amazon.com/images/I/81M+zDPaxhL._AC_SY879_.jpg",
      },

      {
        title: "Star Wars: Episode VI - Return of the Jedi",
        year: 1983,
        genre: "Sci-Fi",
        synopsis:
          "Luke Skywalker and his friends join forces with the Rebel fleet to launch a daring plan to destroy the new Death Star and defeat the Empire once and for all, while Luke confronts the truth about his father.",
        movieImageUrl: "https://m.media-amazon.com/images/I/81E911hVDAL._AC_SY879_.jpg",
      },

      {
        title: "Star Wars: Episode I - The Phantom Menace",
        year: 1999,
        genre: "Sci-Fi",
        synopsis:
          "Set before the events of the original trilogy, Jedi Knight Qui-Gon Jinn and his apprentice Obi-Wan Kenobi discover a young boy named Anakin Skywalker, who may be the prophesied Chosen One destined to bring balance to the Force.",
        movieImageUrl: "https://m.media-amazon.com/images/I/81gzXmcpM6L._AC_SY879_.jpg",
      },

      {
        title: "Star Wars: Episode II - Attack of the Clones",
        year: 2002,
        genre: "Sci-Fi",
        synopsis:
          "As the galaxy edges closer to war, Jedi Knight Obi-Wan Kenobi and his apprentice Anakin Skywalker uncover a separatist plot while Anakin falls in love with Padmé Amidala, leading to a chain of events that will change the galaxy forever.",
        movieImageUrl: "https://m.media-amazon.com/images/I/61nFfWio-sL._AC_SY879_.jpg",
      },

      {
        title: "Star Wars: Episode III - Revenge of the Sith",
        year: 2005,
        genre: "Sci-Fi",
        synopsis:
          "The Clone Wars rage across the galaxy, and Jedi Knight Anakin Skywalker is seduced by the dark side of the Force, becoming the Sith Lord Darth Vader and aiding the Emperor in his rise to power.",
        movieImageUrl: "https://m.media-amazon.com/images/I/81Uk9cyj1-L._AC_SY879_.jpg",
      },
    ];

    for (const singleMovie of moviesData) {
      const currentMovie = await Movie.query().findOne({ title: singleMovie.title });
      if (!currentMovie) {
        await Movie.query().insert(singleMovie);
      }
    }
  }
}

export default MoviesSeeder;
