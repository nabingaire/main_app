require('dotenv').config();

// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");


// Initialize Express App
const app = express();

// Set up Mongoose connection to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data
app.use(express.static(path.join(__dirname, "public"))); // Serves static files
app.set("view engine", "pug"); // Sets Pug as the templating engine

// Define User Schema and Model
const userSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    dateOfBirth: Date,
    address1: String,
    address2: String,
    city: String,
    postalCode: String,
    country: String,
    phoneNumber: String,
    email: String,
    notes: String,
});
const User = mongoose.model("User", userSchema); // Model to interact with User data

// Routes

// Home route to display all users
app.get("/", async(req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from the database
        res.render("display", { users }); // Render the "display" view, passing user data
    } catch (error) {
        console.error(error);
        res.send("Error retrieving users.");
    }
});

// Route to show the form to add a new user
app.get("/add", (req, res) => {
    res.render("add"); // Displays form to add a new user
});

// Route to handle the form submission for adding a new user
app.post("/add", async(req, res) => {
    try {
        const user = new User(req.body); // Creates a new user from form data
        await user.save(); // Saves user to the database
        res.redirect("/"); // Redirects to the home page
    } catch (error) {
        console.error(error);
        res.send("Error adding user.");
    }
});

// Route to show the form to update an existing user
app.get("/update/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id); // Finds user by ID
        res.render("update", { user }); // Displays form to edit user
    } catch (error) {
        console.error(error);
        res.send("Error retrieving user for update.");
    }
});

// Route to handle the form submission for updating an existing user
app.post("/update/:id", async(req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body); // Updates user data
        res.redirect("/"); // Redirects to the home page
    } catch (error) {
        console.error(error);
        res.send("Error updating user.");
    }
});

// Route to handle deleting a user
app.post("/delete/:id", async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id); // Deletes user by ID
        res.redirect("/"); // Redirects to the home page
    } catch (error) {
        console.error(error);
        res.send("Error deleting user.");
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});