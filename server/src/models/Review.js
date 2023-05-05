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
        const { Movie, User } = require("./index.js")
        return {
            Movie: {
                relation: Model.BelongsToOneRelation,
                modelClass: Movie,
                join: {
                    from: "reviews.movieId",
                    to: "movies.id"
                }
            },
            User: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Review