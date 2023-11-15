const express = require("express");
const PerfexUsersData = require("../models/perfexUsers")
const jwtAuth = require("../middleware/jwtAuth");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");










router.get("/", (req, res) => {
    res.send("This is Authentication Router Page")
});


router.post("/signup", async (req, res) => {
   
        
    try {
        const isUserExist = await PerfexUsersData.findOne({ email: req.body.email })
        console.log(isUserExist)
        if (!isUserExist) {
            const hashedPassword =await bcrypt.hash(password,10);
                        console.log(hashedPassword);
                       
            const newUser = {
                "name": req.body.name,
                "email": req.body.email,
                "phoneNumber": req.body.phoneNumber,
                "gender": req.body.gender,
                "password": req.body.password,
                "confirmPasword": req.body.confirmPasword
            };
            const userDetails = await PerfexUsersData.create(newUser)   //  POSTING TO COLLECTION OR MODEL
            console.log(userDetails)

            res.status(200).send("user created successfully")

        } else {

            res.status(400).json("user already registered")

        }
        //           
    } catch (e) {
        console.log(e.message)
        return res.status(500).json("message: e.message")

    }
});































router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email

        const isUserExist = await PerfexUsersData.findOne({ email });

        if (!isUserExist) {
            return res.status(401).send('User not found');
        }
        const payload = {
            user: isUserExist.id,
        };
        jwt.sign(
            payload,
            'jwtpassword',
            { expiresIn: 3600 }, // 3600 seconds = 1 hour
            (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal server error');
                }
                return res.json({ token });
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;