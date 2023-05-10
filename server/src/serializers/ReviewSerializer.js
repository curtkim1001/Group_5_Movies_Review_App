class ReviewSerializer {
    static async showDetails(reviews, currentUser) {
        const allowedAttributes = ["id", "content", "rating", "spoilerWarning"]

        const serializedReviews = await Promise.all(reviews.map(async (review) => {
            const serializedSingleReview = {}
            for (const attribute of allowedAttributes) {
                serializedSingleReview[attribute] = review[attribute]
            }
            const relatedUser = await review.$relatedQuery("user")
            serializedSingleReview.user = relatedUser


            const relatedVotes = await review.$relatedQuery("votes")

            // we dont bneed this 
            // serializedSingleReview.votes = relatedVotes

            // instead, iterate over related votes and get the vote total
            // and write logic to determine if the current user has voted on this review
            // if no current user, then just say they didnt vote
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
        const relatedUser = await review.$relatedQuery("user")
        serializedReview.user = relatedUser

        const relatedVotes = await review.$relatedQuery("votes")
        serializedReview.votes = relatedVotes

        return serializedReview
    }
}

export default ReviewSerializer