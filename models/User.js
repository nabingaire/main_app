// Import the Mongoose library
const mongoose = require("mongoose");

// Define a schema for the User model to structure documents in the database
const userSchema = new mongoose.Schema({
    lastName: String, // User's last name
    firstName: String, // User's first name
    dateOfBirth: Date, // User's date of birth
    address1: String, // Primary address line
    address2: String, // Secondary address line
    city: String, // City of residence
    postalCode: String, // Postal code for the address
    country: String, // Country of residence
    phoneNumber: String, // Contact phone number
    email: String, // Contact email address
    notes: String, // Additional notes
});

// Export the model based on the user schema
// Enables interaction with the "users" collection in MongoDB
module.exports = mongoose.model("User", userSchema);