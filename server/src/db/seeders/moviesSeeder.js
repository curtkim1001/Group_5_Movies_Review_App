
import { Movie } from "../../models/index.js"

class MoviesSeeder {
    static async seed() {
        const moviesData = [
            {
                title: "Lord of the Rings: The Fellowship of the Ring",
                year: 2001,
                genre: "Fantasy",
                synopsis: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
                movieImageUrl: "https://m.media-amazon.com/images/I/A1yy50fuVnL._RI_.jpg"
            },
            {
                title: "Lord of the Rings: The Two Towers",
                year: 2002,
                genre: "Fantasy",
                synopsis: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
                movieImageUrl: "https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"
            },
            {
                title: "Lord of the Rings: The Return of the King",
                year: 2003,
                genre: "Fantasy",
                synopsis: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
                movieImageUrl: "https://upload.wikimedia.org/wikipedia/en/b/be/The_Lord_of_the_Rings_-_The_Return_of_the_King_%282003%29.jpg"
            }
        ]

        for (const singleMovie of moviesData) {
            const currentMovie = await Movie.query().findOne({ title: singleMovie.title })
            if(!currentMovie) {
                await Movie.query().insert(singleMovie)
            }
        }
    }
}

export default MoviesSeeder