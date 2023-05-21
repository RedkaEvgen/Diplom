import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
    fullName:{
        type:String,
        required:true,
    },
    role: String,
    email:{
        type:String,
        required:true,
        unique:true,
    },
    passwordHash:{
        type:String,
        required:true,
    },
    avatarUrl: String,
    cart:[{
        type: Object,
        ref: 'Cart',
        required:true
    }],
},
    {
    timestamps:true,
 },
);

export default mongoose.model('User',UserSchema);
