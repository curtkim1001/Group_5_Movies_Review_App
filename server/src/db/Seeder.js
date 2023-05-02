/* eslint-disable no-console */
import { connection } from "../boot.js"
import MoviesSeeder from "./seeders/MoviesSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding movies...")
    await MoviesSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder