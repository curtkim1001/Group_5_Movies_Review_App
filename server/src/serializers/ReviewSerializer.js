class ReviewSerializer {
    static async showDetails(review) {
        const allowedAttributes = ["id", "content", "rating", "spoilerWarning"]

        const serializedReview = {}
        for (const attribute of allowedAttributes) {
            serializedReview[attribute] = review[attribute]
        }
        const relatedUser = await review.$relatedQuery("User")
        serializedReview.user = relatedUser
        
       return serializedReview
    }
}

export default ReviewSerializer