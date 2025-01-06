const { z } = require("zod");

// Register Schema for validation -----------------------------------
const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .email('Invalid email address')
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(255, { message: "Email must be less than 255 characters" }),

    password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long'),
});

// Register Schema for validation -----------------------------------
// loginSchema will be as it is used and further validations are added below
const registerSchema = loginSchema.extend({
    username: z
        .string({ required_error: 'Username is required' })
        .trim()
        .min(2, 'Username must be at least 2 characters long')
        .max(30, 'Username cannot be longer than 30 characters'),

    phoneNumber: z
        .string().optional(), // phone number is Optional 

    country: z
        .string().optional(), // Optional country

    termsAccepted: z
        .boolean({ required_error: 'Terms of service acceptance is required' })
        .transform(accepted => accepted === true), // Ensure terms are explicitly accepted

    // isAdmin: z.boolean().optional(), // Optional isAdmin field
});

module.exports = {registerSchema, loginSchema}  