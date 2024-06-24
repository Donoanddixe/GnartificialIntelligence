import { Schema, model } from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"
import validator from "validator"
import bcrypt from "bcrypt"
import { hash } from "bcrypt"

const { isEmail } = validator
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'that username is already taken']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'that email is already taken'],
        validate: [isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [8, 'password must be at least 8 characters long']

    }
}, { timestamps: true })
UserSchema.plugin(mongooseUniqueValidator)

// middleware
UserSchema.virtual('confirmPassword')
    .get(function () {
        return this._confirmPassword
    })
    .set(function (value) {
        this._confirmPassword = value
    })

UserSchema.pre('validate', function (next) {
    if (this.password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Passowords dont match')
    }
    next()
})

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
})

const User = model('User', UserSchema)
export default User