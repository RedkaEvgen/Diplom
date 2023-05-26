import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
    title:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    tags:{
        type:Array,
        default:[],
    },
    viewsCount:{
        type:Number,
        default:0,
    },
    price:{
        type:Number,
    },

    imageUrl: String,
 },
 {
    timestamps:true,
 },
);

export default mongoose.model('Product',ProductSchema);
