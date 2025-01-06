const User = require("../models/user-models");

//Home Logic
const home = async (req, res) => {
    try {
        res
            .status(200)
            .send("Welcome to Home page - from auther Controller!!");
    }
    catch (error) {
        console.log("Error from home controller" + error);
    }
};

//Registration Logic ----------------------------------------------------------------------------
const register = async (req, res) => {
    try {
        console.log(req.body); // Passing the body data to the Console
        const { username, email, phoneNumber, password, country, termsAccepted, isAdmin } = req.body; // Destructuring for potential additional fields

        const userExist = await User.findOne({ email }); // you have to use await while using findOne
        if (userExist) {
            return res.status(406).json({ message: "Email already exist" });
        }

        const userCreated = await User.create({ username, email, phoneNumber, password, country, termsAccepted, isAdmin });

        // JSON Web TOKEN is added
        res
            .status(200)
            .json({
                msg: "Registration Successful",
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString()
            });
    } catch (error) {
        // console.log("Error from register controller " + error);
        // res.status(404).send({ msg: "page not found" })

        next(error); // it will throw the error to the middleware
    }
};

//Login Logic ----------------------------------------------------------------------------
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email }).select('+password');
        // .select('+password'), we ensure that the password field is included in the retrieved user document. This should resolve the issue with the hashed password being logged as undefined.

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
     
        const user = await userExist.comparePassword(password);

        if (user) {
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        console.log("Error from Login controller: " + error);
        res.status(500).send({ msg: "Internal server Error" });
    }
}

//User Logic ----------------------------------------------------------------------------

const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(`Error form User Route ${error}`)
    }
}
    
module.exports = { home, register, login, user };
// We will import this in to the auth-router
