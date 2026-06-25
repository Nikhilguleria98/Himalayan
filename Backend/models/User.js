import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({ 

    isVerified: {
        type: Boolean,
        default: false,
    },

    verificationToken: {
        type: String,
    },

    verificationTokenExpires: {
        type: Date,
    },

    userName : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        default : ''
    },
    role : {
        type : String,
        default : 'user'
    },



}, { timestamps: true })

const User = mongoose.model('User',UserSchema);

export default User
