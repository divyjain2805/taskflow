const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, require: true,trim: true },
    email: { type: String, require: true, unique: true, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Valid email daalo'] },
    password: { type: String, require: true, minlength: [6, 'make strong password'], select: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);