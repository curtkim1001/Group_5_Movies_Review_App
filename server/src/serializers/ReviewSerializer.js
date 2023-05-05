class ReviewSerializer {
    static async showDetails(review) {
        const allowedAttributes = ["id", "content", "rating", "spoilerWarning", "movieId", "userId"]

        const serializedReview = {}
        for (const attribute of allowedAttributes) {
            serializedReview[attribute] = review[attribute]
        }
        console.log(serializedReview)
        const relatedUser = await review.$relatedQuery("User")
        serializedReview.user = relatedUser

        console.log(serializedReview)
       return serializedReview
    }
}

export default ReviewSerializer