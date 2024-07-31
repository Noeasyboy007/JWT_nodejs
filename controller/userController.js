const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const test = async (req, res) => {
    try {
        res.cookie("Aritra", "Bera");
        res.send("Done")
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

const userRegistration = async (req, res) => {
    try {
        const { name, email, password, password_confirmation } = req.body;

        const user = await userModel.findOne({ email: email });

        if (user) {
            return res.status(400).json({ error: "Email already exists" });
        }
        else {
            if (name && email && password && password_confirmation) {
                if (password === password_confirmation) {

                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password, salt);

                        const savedUser = new userModel({
                            name: name,
                            email: email,
                            password: hashedPassword,
                        })

                        await savedUser.save();
                        res.status(200).json({ message: savedUser });
                        console.log("New User saved");
                    } catch (error) {
                        res.status(400).json({ error: "internal server error" });
                        console.log(error.message);
                    }
                }
                else {
                    return res.status(400).json({ error: "Passwords do not match" });
                }
            }
            else {
                return res.status(400).json({ error: "All fields are required" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { test, userRegistration };