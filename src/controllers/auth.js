const User = require('../models/user')
const jwt = require('jsonwebtoken')


const controller = {}



controller.signup = async (request, response) => {
    const {firstName, lastName, email, password} = request.body
    const user = newUser ({firstName, lastName, email, password})


    try{
        const newUser = await user.save()
        response.send({message: "User Created Succesfully", newUser})
    } catch (exception) {
        console.log (exception)
        response.status(500).send({error: "internal server error"})
    }
}


controller.login = async (request, response) => {
    const {email, password} = request.body
    await User.findOne({email: email}, (error, user) => {
        if (error) {
            response.status(500).send({error: "INTERNAL SERVER ERROR"})
        }
        if (!user) {
            response.status(401).send({message: "Invalid Email or password"})
        }

     // Verify user password
    user.checkPassword(password, (error, isMatch) => {
        error ? response.status(500).send({error: error}) : {}
    })
    // Log user in
    const payload = {email: user.email, id: user.id}
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    response.cookie("Authorization", `Bearer ${token}`, {httpOnly: true, maxAge: 86_400_000})

    response.send(user)
})
}



module.exports = controller