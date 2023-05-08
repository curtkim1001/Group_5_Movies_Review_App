/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("users", table => {
        table.string("username").notNullable().unique()
        table.boolean("admin").notNullable().defaultTo(false)
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("users", table => {
        table.dropColumn("username")
        table.dropColumn("admin")
    })
}
