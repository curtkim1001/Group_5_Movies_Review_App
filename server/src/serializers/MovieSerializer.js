import ReviewSerializer from "./ReviewSerializer.js";

class MovieSerializer {
  static async getSummary(movie) {
    const allowedAttributes = ["id", "title", "year", "genre", "synopsis", "movieImageUrl"];

    const serializedMovie = {};
    for (const attribute of allowedAttributes) {
      serializedMovie[attribute] = movie[attribute];
    }
    const reviews = await movie.$relatedQuery("reviews");
    const serializedReviews = await Promise.all(
      reviews.map(async (review) => {
        return await ReviewSerializer.showDetails(review);
      })
    );
    serializedMovie.reviews = serializedReviews;
    return serializedMovie;
  }
}

export default MovieSerializer;
