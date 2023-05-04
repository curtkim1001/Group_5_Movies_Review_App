/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("reviews", (table)=>{
        table.bigIncrements("id")
        table.bigInteger("userId")
            .unsigned()
            .references("users.id")
            .index()
            .notNullable()
        table.text("content")
            .notNullable()
        table.integer("rating")
            .notNullable()
        table.bigInteger("movieId")
            .unsigned()
            .references("movies.id")
            .index()
            .notNullable()
        table.boolean("spoilerWarning").notNullable()
        table.timestamp("createdAt")
            .notNullable()
            .defaultTo(knex.fn.now())
        table.timestamp("updatedAt")
            .notNullable()
            .defaultTo(knex.fn.now())


    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("reviews")
}
