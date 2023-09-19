const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { useCookies } = require('react-cookie');

router.post('/signup', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        console.log(req.body);

        //add logic to check if user exist
        const user = await User.findOne({email})
        if (user) {
            res.status(400).json({})
            return console.log("User already exist. Please login");
        }

        //add logic to hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash
        (password, salt)

        const newUser = new User ({
            username, 
            email, 
            password: hashedPassword, 
        });

        //saving the user
        const savedUser = await newUser.save();
        console.log(savedUser);

        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        console.log("Signup failed" + error);
        res.status(500).json({message: 'Signup failed'});
    }
});



router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(req.body);

        //check if user exist
        const user = await User.findOne({email})
        if (!user) {
            res.status(400).json({message: "User doesn't exist. Please signup"});
            return console.log("User doesn't exist. Please signup")
        }

        //check if password is valid
        const validPassword = await bcryptjs.compare
        (password, user.password)
        // console.log("Stored hashed password", user.password)            
        // console.log("Password to compare", password)

        if (!validPassword) {
            res.status(400).json({message: "Invalid password"});
            return console.log("Invalid password. Try again") 
        }

        //create token data
        const tokenData = {
            id: user._id, 
            username: user.username, 
            email: user.email, 
        }

        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        //set cookie
        res.cookie("access_token", token, {
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000, 
        });

        // console.log("Cookie set successful");

        return res.status(201).json({
            message: "Login successful",
            access_token: token, 
            success: true, 
        });

        
    } catch (error) {
        console.log("Login failed" + error);
        res.status(500).json({message: "Login failed"});
     } 

});

router.get('/logout', async (req, res) => {
    try {

        return res.status(201).json({
            message: "Logout successful", 
            access_token: "", 
            success: true,
        })

    } catch (error) {
        res.status(500).json({message: "Logout failed"});
    }
} );

//getDataFromToken
const getDataFromToken = (req, res) => {
    try {
        const token = req.cookies.access_token || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message);
        
    }
};

router.get('/profile', async (req, res) => {
    try {
        const userID = await getDataFromToken(req);
        const user = await User.findOne({_id: userID}).select("-password");

        return res.json({
            message: "User found", 
            data: user
        })
    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
})


module.exports = router;