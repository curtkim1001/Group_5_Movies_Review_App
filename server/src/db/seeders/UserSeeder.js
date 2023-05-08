import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const userData = [
            {
                username: "launchacademy1",
                email:"launchacademy@gmail.com",
                password: "launch",
                admin: false
            }, 
            {
                username: "curtkim1",
                email:"curtkim@email.com",
                password:"12345",
                admin: true
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