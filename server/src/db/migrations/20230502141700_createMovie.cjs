/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("movies", (table)=> {
        table.bigIncrements("id")
        table.string("title").notNullable()
        table.integer("year").notNullable()
        table.string("genre").notNullable()
        table.text("synopsis")
        table.string("movieImageUrl") 
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("movies")
}
