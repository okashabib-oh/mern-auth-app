const UserModel = require("../Models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(409).json({
                message: "User already exists"
            })
        }
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10)
        await newUser.save();
        res.status(201).json({
            message: "Signup successful",
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        const errMsg = "Invalid credentials, email or password is incorrect";

        if (!user) {
            return res.staus(409).json({
                message: errMsg, success: false
            })
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(403).json({
                message: errMsg, success: false
            })
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

module.exports = {
    signup,
    login
}