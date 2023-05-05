const { Model } = require("objection")

class Movie extends Model {
    static get tableName() {
        return "movies"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["title", "year", "genre"],
            properties: {
                title: {
                    type: "string"
                },
                genre: {
                    type: "string"
                },
                year: {
                    type: ["string", "integer"]
                },
                synopsis: {
                    type: "string"
                },
                movieImageUrl: {
                    type: "string"
                }
            }
        }
    }
    static get relationMappings(){
        const { Review, User } = require("./index.js")
        return {
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: "movies.id",
                    to: "reviews.movieId"
                }
            },
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "movies.id",
                    through: {
                        from: "reviews.movieId",
                        to: "reviews.userId"
                    },
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Movie