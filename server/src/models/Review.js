const Model = require("./Model")

class Review extends Model {
    static get tableName() {
        return "reviews"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["content", "rating", "spoilerWarning"],
            properties: {
                content: { type: "string", minLength: 2 },
                rating: { type: ["string", "integer"] },
                spoilerWarning: { type: ["boolean", "string"] }
            }
        }
    }
    static get relationMappings() {
        const { Movie, User, Vote } = require("./index.js")
        return {
            movie: {
                relation: Model.BelongsToOneRelation,
                modelClass: Movie,
                join: {
                    from: "reviews.movieId",
                    to: "movies.id"
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            },
            votes: {
                relation: Model.HasManyRelation,
                modelClass: Vote,
                join: {
                from: "reviews.voteId",
                to: "votes.id"
                }
            }
        }
    }
}

module.exports = Review