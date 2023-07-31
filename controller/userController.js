const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");
// @desc Register the user
// @route POST api/register
// @access public

const registerUser  = asyncHandler(async (req, res) => {
    const {username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    // const userAvailable = await username.find({email})
    // if(userAvailable) {
    //     res.status(400);
    //     throw new Error("User already registered!");
    // }

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if(user){
        res.status(201).json({id: user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("User is not valid");
    }
});

// @desc Login user
// @route POST api/login
// @access public

const loginUser  = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || ! password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email })
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_SECRET_TOKEN,
        { expiresIn: "15m"}
        );
        res.status(200).json({ accessToken })
    } else {
        res.status(401);
        throw new Error("Email or Password are not valid")
    }
});

// @desc Current user
// @route GET api/current
// @access private

const currentUser  = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser}