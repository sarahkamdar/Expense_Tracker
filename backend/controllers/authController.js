const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

const register = async (req, res) => {
    try {
        const { name, email, password, firebaseUid } = req.body;

        if (!name || !email || !password || !firebaseUid) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user exists
        const userExists = await User.findOne({ 
            $or: [
                { email },
                { firebaseUid }
            ]
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            firebaseUid,
            defaultCategories: {
                income: ['Salary', 'Freelance', 'Investments'],
                expense: ['Food', 'Transportation', 'Entertainment']
            }
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                message: 'Registration successful. Please login.'
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log('User logged in successfully:', {
            userId: user._id,
            email: user.email,
            hasIncomes: user.incomes.length > 0,
            hasExpenses: user.expenses.length > 0
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

const googleAuth = async (req, res) => {
    try {
        console.log('Google auth request body:', req.body);
        const { token: googleToken, name, email, imageUrl, firebaseUid } = req.body;

        if (!email || !firebaseUid) {
            console.error('Missing required fields:', { email, firebaseUid });
            return res.status(400).json({ 
                message: 'Email and Firebase UID are required',
                received: { email, firebaseUid }
            });
        }

        // Check if user exists by email or firebaseUid
        let user = await User.findOne({ 
            $or: [
                { email: email },
                { firebaseUid: firebaseUid }
            ]
        });

        console.log('Existing user found:', user ? 'Yes' : 'No');

        if (!user) {
            console.log('Creating new user...');
            try {
                // Create new user if doesn't exist
                user = await User.create({
                    name: name || 'User',
                    email,
                    password: Math.random().toString(36).slice(-8),
                    firebaseUid,
                    defaultCategories: {
                        income: ['Salary', 'Freelance', 'Investments'],
                        expense: ['Food', 'Transportation', 'Entertainment']
                    }
                });
                console.log('New user created:', user._id);
            } catch (createError) {
                console.error('Error creating user:', createError);
                if (createError.code === 11000) {
                    // If user exists, try to find and update
                    user = await User.findOne({ email });
                    if (user) {
                        user.firebaseUid = firebaseUid;
                        await user.save();
                        console.log('Updated existing user:', user._id);
                    } else {
                        return res.status(400).json({
                            message: 'User already exists with this email or Firebase UID',
                            error: createError.keyValue
                        });
                    }
                } else {
                    throw createError;
                }
            }
        } else {
            console.log('Updating existing user...');
            try {
                // Update existing user's information
                user.name = name || user.name;
                user.firebaseUid = firebaseUid;
                await user.save();
                console.log('User updated:', user._id);
            } catch (updateError) {
                console.error('Error updating user:', updateError);
                throw updateError;
            }
        }

        const jwtToken = generateToken(user._id);
        console.log('Token generated for user:', user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: jwtToken
        });
    } catch (error) {
        console.error('Google auth error details:', {
            message: error.message,
            code: error.code,
            keyPattern: error.keyPattern,
            keyValue: error.keyValue,
            stack: error.stack
        });
        
        res.status(500).json({
            message: 'Server error during Google authentication',
            error: error.message
        });
    }
};

module.exports = {
    register,
    login,
    googleAuth
}; 