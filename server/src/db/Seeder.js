/* eslint-disable no-console */
import { connection } from "../boot.js"
import moviesSeeder from "./seeders/moviesSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding movies...")
    await moviesSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder