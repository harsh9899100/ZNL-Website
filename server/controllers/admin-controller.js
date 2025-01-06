const User = require("../models/user-models");
const Contact = require("../models/contect-model");

// Getting all the users details from the backend ........
const getAllusers = async (req, res, next) => {
    try {
        const users = await User.find({}, {password: 0, termsAccepted : 0});
        // password: 0 => removes the password field
        // password: 1 => retrive only password field
        
        console.log(users);
        
        if(!users || users.length === 0){
            return res.status(200).json({message : "No users found"});
        }
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
};

// Deleting User by ID from the backend .......................
// const deleteUserById = async (req, res) => {
//  try {
//     const id = req.params.userId;
//     await User.deleteOne({_id: userId});

//     return res.status(200).json({ message: "User Deleted Successfully"});
//  } catch (error) {
//     next(error);
//  }
// }
// deleteUserById

// Getting all the contact details from the backend ........
const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find({});
        
        console.log(contacts);
        
        if(!contacts || contacts.length === 0){
            return res.status(200).json({message : "No contacts found"});
        }
        res.status(200).json(contacts);

    } catch (error) {
        next(error);
    }
};

module.exports = {getAllusers, getAllContacts };