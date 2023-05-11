class ReviewSerializer {
    static async showDetails(reviews, currentUser) {
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
                voteTotal += vote.votes
            })
            serializedSingleReview.votes = voteTotal



            // if (currentUser) {
            //     let votesArray = []
            //     const userVote = relatedVotes.forEach(vote => {
            //         if (vote.userId === currentUser.id) {
            //             votesArray.push(vote)
            //         }
            //     })
            //     let voteTotal = 0
            //     votesArray.forEach((vote) => {
            //         voteTotal += vote.votes
            //     })
            //     serializedSingleReview.votes = voteTotal
            // } else {
            //     serializedSingleReview.votes = null
            // }
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