import express from "express";
import multer from "multer";

import * as fs from "fs";
import* as  https from "https";



import cors from "cors";
import mongoose from 'mongoose';
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

import { registerValidation, loginValidation, productCreateValidation} from './validations.js';

import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as ProductsController from './controllers/ProductsController.js';
import * as CartController  from "./controllers/CartController.js";


const PORT = 4444;
mongoose.connect('mongodb+srv://root:root@cluster0.ctmgvju.mongodb.net/?retryWrites=true&w=majority')
.then (()=>console.log('DB ok'))
.catch((err)=> console.log('DB error',err));

const app =express();

const storage = multer.diskStorage({
    destination: (req,file, cb)=> {
        const body = String(req.body.data);
        req.body = JSON.parse(body);

        if(!req.body?.imageUrl || req.body?.imageUrl !== `http:localhost:${PORT}/uploads/${file.originalname}`) {
            cb(null,'uploads/products');
        }
    },
    filename:(req, file,cb)=> {
        const body = String(req.body.data);
        req.body = JSON.parse(body);

        if(req.body?.imageUrl !== `http:localhost:${PORT}/uploads/${file.originalname}`) {
            req.body.imageUrl = `http:localhost:${PORT}/uploads/products/${file.originalname}`
        }

        cb(null,file.originalname);
    }
});

const upload = multer({ storage });

app.use(cors())

app.use(express.json());
const server = https.createServer({key: key, cert: cert }, app);

app.use('/uploads', express.static('uploads'));


app.post('/auth/login',loginValidation, UserController.login);
app.post('/auth/register',registerValidation,UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload',upload.single('image'),(req,res)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
})

app.get('/products', ProductsController.getAll); // For All Product
app.get('/products/:id', ProductsController.getOne); // For One product
// For admin
app.post('/products' , upload.any(), productCreateValidation,  ProductsController.create);
app.delete('/products/:id', checkAuth , ProductsController.remove);
app.patch('/products/:id', upload.any(), ProductsController.update);

app.patch('/user/cart', checkAuth, CartController.add);
app.delete('/user/cart', checkAuth, CartController.remove);

app.listen(PORT,(err)=>{
    if(err){
        return console.log(err);
    }
    console.log(`Server OK PORT ${PORT}` )
});
