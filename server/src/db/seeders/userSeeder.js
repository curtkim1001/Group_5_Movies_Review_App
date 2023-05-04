import { Review, Movie, User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const userData = [
            {
                email: "user1@userData.com",
                cryptedPassword: "banana"
            },
            {
                email: "user2@userData.com",
                cryptedPassword: "banana1"
            }
        ]
        for (const singleUser of userData) {
            const currentUser = await User.query().findOne({ email: singleUser.email })
            if (!currentUser) {
                await User.query().insert(singleUser)
            }
        }
    }
}

export default UserSeeder