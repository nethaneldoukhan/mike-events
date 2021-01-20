const mongoose = require('mongoose')
const debug = require('debug')('app:schema')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    idNum: {
        type: Number,
        required: true,
        trim: true,
        minlength: 9,
        maxlength: 9
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    tel: {
        type: Number,
        required: true,
        trim: true,
        minlength: 9,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
          if (value.includes('password')) {
            throw new Error('password cannot includes "password"')
          }
        }
    },
    createDate: {
        type: Date
    }
});
const User = mongoose.model("User", userSchema);

module.exports = User;