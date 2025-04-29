const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firebaseUid: {
        type: String,
        required: [true, 'Firebase UID is required'],
        unique: true,
        index: true
    },
    incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Income' }],
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
    defaultCategories: {
        income: [String],
        expense: [String]
    }
}, {
    timestamps: true,
    strict: true,
    autoIndex: false // Disable automatic index creation
});

// Explicitly define only the indexes we want
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ firebaseUid: 1 }, { unique: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);