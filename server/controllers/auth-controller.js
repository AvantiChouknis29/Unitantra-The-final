const User = require("../model/user-model");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Token = require("../model/token");
const verifmail = require('../utils/sentEmail');

// Home Route
const home = async (req, res) => {
    try {
        res.status(200).send('Home page');
    } catch (error) {
        console.error('Error in home route:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// Register Route
const register = async (req, res) => {
    try {
        console.log(req.body);  // Log request body to check if `country` is received

        const { username, email, phone, country, password } = req.body;

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            username,
            email,
            phone,
            country,
            password: hashPassword,
            isAdmin: false,
            verified: false  // Ensure user starts as unverified
        });

        // Save user in the database
        const savedUser = await newUser.save();

        // Generate verification token
        const token = new Token({
            userId: savedUser._id,
            token: crypto.randomBytes(16).toString('hex')
        });

        // Save token in the database
        await token.save();

        // Send verification email
        const verificationLink = `https://unitantra-backend.onrender.com/api/auth/confirm/${token.token}`;
        await verifmail(savedUser.email, verificationLink);

        res.status(201).json({ 
            msg: 'User registered successfully. Verification email sent.',
            userId: savedUser._id.toString() 
        });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// Verify email route
const verifyMail = async (req, res) => {
    try {
        // Find the token in the database
        const token = await Token.findOne({ token: req.params.token });

        if (!token) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update user to verified
        const updateInfo = await User.updateOne({ _id: token.userId }, { $set: { verified: true } });

        if (updateInfo.modifiedCount === 0) {
            return res.status(400).json({ message: 'Failed to verify user' });
        }

        // Remove token from the database
        await Token.findByIdAndDelete(token._id);

        res.status(200).send('Email verified successfully');
    } catch (error) {
        console.error('Error confirming email:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// Login Route
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists and is verified
        const user = await User.findOne({ email });
        if (!user || !user.verified) {
            return res.status(401).json({ message: 'Invalid email/password or account not verified' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email/password or account not verified' });
        }

        // Generate token for authenticated user
        const token = await user.generateToken();
        res.status(200).json({ msg: 'Login successful', token, userId: user._id.toString() });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// User Data Route (Assuming you have middleware to fetch user data)
const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log("userdata",userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.error('Error from the user route:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = { home, register, login, user, verifyMail };
