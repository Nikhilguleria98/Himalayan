import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: function () {
            return this.role !== "admin";
        },
        unique: true,
        sparse: true,
    },
    
    isVerified: {
        type: Boolean,
        default: false,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        default : 'user'
    }
}, { timestamps: true })

const User = mongoose.model('User',UserSchema);

// module.exports = User   //We are using ES module syntax so we cannot export like this instead of this we use 
export default User
