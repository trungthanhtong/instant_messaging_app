const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcrypt");
const SALT = require("../bcrypt/Salt");
const { json } = require("body-parser");
const JWT_SECRET = require("../JWT/JWT_Secret");
const jwt = require("jsonwebtoken");
const jwtVerify = require("../JWT/JWT_Verify");

router.route("/").get((req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => console.log(err));
});

router.route("/add").post(async (req, res) => {
    try {
        let { firstName, lastName, email, password } = req.body;
        const hashed = await bcrypt.hash(password, SALT);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashed,
        });
        await newUser.save();
        res.json("User added!!!");
    } catch (err) {
        if (err.code === 11000) {
            console.log("Duplicate");
        }
        res.status(400).json(err.message);
    }
});

router.route("/login").post(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                },
                JWT_SECRET
            );
            return res.json(
                (data = {
                    token,
                    userInfo: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        chatRooms: user.chatRooms,
                    },
                })
            );
        } else {
            throw new Error("Invalid password");
        }
    } catch (err) {
        console.log("Login Error: ", err.message);
        res.status(400).json(err.message);
    }
});

router.route("/getUser").put(async (req, res) => {
    try {
        const { token } = req.body;
        const id = jwtVerify(token);
        const user = await User.findById(id);
        res.json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            chatRooms: user.chatRooms,
        });
    } catch (err) {
        console.log("Cookie Error: ", err.message);
        res.status(400).json(err.message);
    }
});

module.exports = router;
