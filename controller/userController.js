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
                        //Hashed password
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password, salt);

                        const savedUser = new userModel({
                            name: name,
                            email: email,
                            password: hashedPassword,
                        })

                        await savedUser.save();

                        //JWT token
                        const saved_user = await userModel.findOne({ email: email });
                        const token = jwt.sign({ id: saved_user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

                        res.status(201).json({ message: "Registration Success", savedUser, "token": token });
                        console.log("Registration Success");
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

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await userModel.findOne({ email: email });
            if (user != null) {
                //Compare password
                const isMatch = await bcrypt.compare(password, user.password);
                if ((user.email === email) && isMatch) {

                    //JWT token
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

                    res.status(200).json({ message: "login successful", "token": token });
                    console.log("Successfully logged in");
                }
                else {
                    return res.status(401).json({ error: "Invalid email or password" });
                }
            }
            else {
                return res.status(400).json({ error: "user not exists" });
            }
        }
        else {
            return res.status(400).json({ error: "All fields are required" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
}

module.exports = { test, userRegistration, userLogin };