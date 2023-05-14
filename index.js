import express from "express";

import mongoose from 'mongoose';
import { registerValidation, loginValidation, productCreateValidation} from './validations.js';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as ProductController from './controllers/ProductController.js';
import * as CartController  from "./controllers/CartController.js";

mongoose.connect('mongodb+srv://root:root@cluster0.ctmgvju.mongodb.net/?retryWrites=true&w=majority')
.then (()=>console.log('DB ok'))
.catch((err)=> console.log('DB error',err));

const app =express();

app.use(express.json());

app.post('/auth/login',loginValidation, UserController.login);
app.post('/auth/register',registerValidation,UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/product', ProductController.getAll);
app.get('/product/:id', ProductController.getOne);
app.post('/product', checkAuth , productCreateValidation, ProductController.create);
app.delete('/product/:id', checkAuth , ProductController.remove);
app.patch('/product/:id', ProductController.update);

app.patch('/user/cart', checkAuth, CartController.add);
app.delete('/user/cart', checkAuth, CartController.remove);

app.listen(4444,(err)=>{
    if(err){
        return console.log(err);
    }
    console.log('Server OK' )
}); 
