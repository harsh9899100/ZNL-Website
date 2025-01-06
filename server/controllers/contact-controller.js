const Contact = require("../models/contect-model");

const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response); // Collection in the Database will be created here...
        return res.status(200).json ({ message: "message sent Successfully"});   
    } catch (error) {
        return res.status(500).json ({ message: "messag e not delivered"});   
    }
};

module.exports = contactForm;