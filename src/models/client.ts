import mongoose, { Schema } from "mongoose";
const client = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"],
        immutable: true
    },
    password: {
        type: String,
        require: true
    },
    phone_no: {
        type: String,
        default: null
    }, city: {
        type: String,
        default: null
    }

})

const cars = new mongoose.Schema({

    modal: String,
    color: String,
    owner: { type: String, require: true, immutable: true },
    registration: { type: String, require: true, immutable: true },
    Year: String,
    name: { type: String, require: true }


})

const Client = mongoose.model('Client', client)
const Cars = mongoose.model('Cars', cars)

export {
    Client, Cars
}