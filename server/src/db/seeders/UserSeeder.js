import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const adminData = {
            username: "launchacademy",
            email:"launchacademy@gmail.com",
            cryptedPassword:"launch12345",
            admin: true
        }
        
        const currentAdmin = await User.query().findOne({ email: adminData.email })
        if (!currentAdmin) {
            await User.query().insert(adminData)
        }
    }
}

export default UserSeeder