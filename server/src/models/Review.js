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
        const { Movie } = require("./index.js")
        return {
            Movie: {
                relation: Model.BelongsToOneRelation,
                modelClass: Movie,
                join: {
                    from: "reviews.movieId",
                    to: "movies.id"
                }
            }
        }
    }
}

module.exports = Review