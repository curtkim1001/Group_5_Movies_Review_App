
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
            },
            {
                title: "Inception",
                year: 2010,
                genre: "Sci-Fi",
                synopsis:
                    "A skilled thief is tasked with planting an idea into the mind of a CEO by entering his dreams, but he faces unexpected challenges as the line between reality and dreams becomes blurred.",
                movieImageUrl: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg",
            },
            {
                title: "The Shawshank Redemption",
                year: 1994,
                genre: "Drama",
                synopsis:
                    "A banker is sentenced to life in Shawshank State Penitentiary for the murder of his wife, where he forms an unlikely friendship with a fellow inmate and finds hope through acts of integrity.",
                movieImageUrl: "https://m.media-amazon.com/images/I/51tFp3kjSSL._AC_.jpg",
            },
            {
                title: "Pulp Fiction",
                year: 1994,
                genre: "Crime",
                synopsis:
                    "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                movieImageUrl: "https://m.media-amazon.com/images/I/51Qvs9P7YBL._AC_.jpg",
            },
            {
                title: "The Dark Knight",
                year: 2008,
                genre: "Action",
                synopsis:
                    "Batman sets out to dismantle the remaining criminal organizations in Gotham City with the help of Lieutenant James Gordon and the district attorney, but they face a psychopathic criminal known as the Joker.",
                movieImageUrl: "https://m.media-amazon.com/images/I/51k+PHk+qiL._AC_.jpg",
            },
            {
                title: "Fight Club",
                year: 1999,
                genre: "Drama",
                synopsis:
                    "An insomniac office worker and a soap salesman form an underground fight club as a form of male bonding, but it spirals out of control as their activities become more dangerous.",
                movieImageUrl: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
            },
        ]

        for (const singleMovie of moviesData) {
            const currentMovie = await Movie.query().findOne({ title: singleMovie.title })
            if (!currentMovie) {
                await Movie.query().insert(singleMovie)
            }
        }
    }
}

export default MoviesSeeder