// const router = require("express").Router();
const { user_connection, offer_connection } = require("../model/db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
exports.login = async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.name;

        const userData = await user_connection.find({ name });
        if (!userData[0]) {
            return res.status(400).json({
                message: "User not exist"
            })
        }
        const successResult = bcrypt.compare(password, userData[0].password);
        if (successResult === true) {
            //sign my jwt 
            const payLoad = { "name": result.userData[0].name }
            const token = jwt.sign(payLoad, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: '12h' })

            //maybe check if it succeeds..                          
            res.setHeader("set-cookie", [`JWT_TOKEN=${token}; httponly; samesite=lax`])
            return res.status(200).json({
                message: `${userData[0].username}  login successfully`,
                token
            })
        }
        else
            res.send({ "error": "Incorrect username or password" })

    }
    catch (e) {
        return res.status(400).json({
            message: e.message
        })

    }
}

exports.register = async (req, res) => {
    const { username, email, password, role, age, installed_days, pricing } = req.body;
    const hash =  await bcrypt.hash(req.body.password, 10)
    const userData = await userInfo.create({
        username,
        email,
        age,
        role,
        installed_days,
        ...pricing,
        password : hash,
    })
    return res.status(200).json({
        message: "sucess",
        data: userData
    })
} 
