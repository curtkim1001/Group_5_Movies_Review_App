class ReviewSerializer {
    static async showDetails(reviews) {
        const allowedAttributes = ["id", "content", "rating", "spoilerWarning"]

        const serializedReviews = await Promise.all(reviews.map(async (review)=> {
            const serializedSingleReview = {}
            for (const attribute of allowedAttributes) {
                serializedSingleReview[attribute] = review[attribute]
            }
            const relatedUser = await review.$relatedQuery("User")
            serializedSingleReview.user = relatedUser
            return serializedSingleReview
        }))
        
       return serializedReviews
    }

    static async singleShowDetails(review) {
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