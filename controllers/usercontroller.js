const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { UniqueConstraintError } = require("sequelize/lib/errors")
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

router.get('/test',(req, res) => {
    res.send("Testing This Route!")
})

router.post("/register", async (req, res) => {

    let { username, password } = req.body.user;

    try {
        const User = await UserModel.create({
            username: username,
            passwordhash: bcrypt.hashSync(password, 13)
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: "2d"});

        res.status(201).json({
            message: "User successfully registered!",
            user: User,
            sessionToken: token
        });
    } catch(err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use"
            })
        } else {
            res.status(500).json({
                message: "Failed to register user",
                error: err
            }); 
        }
    }
})

router.post("/login", async (req, res) => {
    let { username, password } = req.body.user;

    try {
        const User = await UserModel.findOne({
            where: {
                username: username
            }
        });

        if (User) {
            let passwordCompare = await bcrypt.compare(password, User.passwordhash);

            if(passwordCompare){
                let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: "2d"});

                res.status(201).json({
                    message: "User successfully logged in!",
                    User: User,
                    sessionToken: token
                })
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
        }
    } catch (error) {
        res.status(401).json({
            message: "Failed to log user in",
            error
        })
    }
})

module.exports = router;