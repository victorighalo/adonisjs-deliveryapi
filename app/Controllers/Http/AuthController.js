'use strict'
const User = use('App/Models/User')
class AuthController {
    async login({request,auth,session,response}){
        const email = request.input("email")
        const password = request.input("password");
        let user = await User.findBy('email', email);
        try{
            if (user) {
                let accessToken = await auth.generate(user)
                return response.json({"messsage":"Success", "access_token": accessToken})
              }
        }catch(error){
        return response.status(400).json({message: error, data: [] });
        }
    }
}

module.exports = AuthController
