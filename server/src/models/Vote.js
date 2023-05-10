const Model = require("./Model")

class Vote extends Model {
    static get tableName() {
        return "votes"
    }

    static get jsonSchema(){
        return {
            type: "object",
            required: ["votes"],
            properties: {
                votes: {type: ["string", "integer"]}
            }
        }
    }
    static get relationMappings(){
        const { Review, User } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "votes.userId",
                    to: "users.id"
                }
            },
            review: {
                relation: Model.BelongsToOneRelation,
                modelClass: Review,
                join: {
                    from: "votes.reviewId",
                    to: "reviews.id"
                }
            }
        }
    }
}


module.exports = Vote