class ReviewSerializer {
    static async showDetails(reviews) {
        const allowedAttributes = ["id", "content", "rating", "spoilerWarning",]
        const serializedReviews = await Promise.all(reviews.map(async (review) => {
            const serializedSingleReview = {}
            for (const attribute of allowedAttributes) {
                serializedSingleReview[attribute] = review[attribute]
            }
            const relatedUser = await review.$relatedQuery("user")
            serializedSingleReview.user = relatedUser
            const relatedVotes = await review.$relatedQuery("votes")
            let voteTotal = 0
            relatedVotes.forEach((vote) => {
                voteTotal += vote.voteValue
            })
            serializedSingleReview.voteValue = voteTotal
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
        let voteTotal = 0
        relatedVotes.forEach((vote) => {
            voteTotal += vote.voteValue
        })
        serializedReview.voteValue = voteTotal
        return serializedReview
    }
}

export default ReviewSerializer