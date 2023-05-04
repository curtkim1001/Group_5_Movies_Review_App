/* eslint-disable no-console */
import { connection } from "../boot.js"
import User from "../models/User.js"
import MoviesSeeder from "./seeders/MoviesSeeder.js"
import ReviewsSeeder from "./seeders/reviewsSeeder.js"
import UserSeeder from "./seeders/userSeeder.js"
class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding movies...")
    await MoviesSeeder.seed()

    console.log("seeding users")
    await UserSeeder.seed()

    console.log("Seeding reviews")
    await ReviewsSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder