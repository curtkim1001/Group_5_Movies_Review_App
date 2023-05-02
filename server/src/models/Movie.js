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
}

module.exports = Movie