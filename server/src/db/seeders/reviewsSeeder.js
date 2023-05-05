import { Review, Movie } from "../../models/index.js"

class ReviewsSeeder {
    static async seed() {
        const loTR1 = await Movie.query().findById(1)
        const loTR2 = await Movie.query().findById(2)

        const reviewsData = [
            { content: "Movie was good", rating: 5, spoilerWarning: false, movieId: loTR1.id, userId: 1 },
            { content: "Gandalf isn't dead", rating: 4, spoilerWarning: true, movieId: loTR2.id, userId: 2 },
            { content: "Movie was full of ghosts", rating: 3, spoilerWarning: false, movieId: loTR2.id, userId: 2 },
        ]
        for (const review of reviewsData) {
            const movie = await Review.query().findOne(review)
            if (!movie) {
                await Review.query().insert(review)
            }
        }
    }
}



export default ReviewsSeeder