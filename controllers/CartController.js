import UserModel from '../models/User.js';
import product from "../models/Product.js";


export const add = async (req , res ) => {
 try {
    const userId = req.userId;
    const cart = req.body;

    const userData = await UserModel.findOne({ _id: userId});
    const userCart = userData.cart;

    const productById = userCart.find((el) => el.productId === cart.id);
    const productCount = productById?.count || 0;

    if(productCount) {
        const deletePrevData = await UserModel.findOneAndUpdate(
            {
                _id: userId,
            },
            {
                $pull: {
                    cart: {
                        'productId': cart.id,
                    }
                },
            }
        )
    }


    const result = await UserModel.findOneAndUpdate(
        {
            _id: userId,
        },
        {
            $addToSet: {
                cart: {
                    'productId': cart.id,
                    'count': productCount + cart.count
                }
            },
        }
    )
   res.status(200).json(result)

 }
  catch(err) {
    console.log(err);
    res.status(500).json({
     message:'Не удалось добавить продукт',
    });
}}

export const update = async (req , res ) => {
    try {
        const userId = req.userId;
        const cart = req.body;

        console.log('Cart', cart)

        const result = await UserModel.findOneAndUpdate(
            {
                _id: userId,
                "cart.productId":cart.productId
            },
            {
                '$set': {
                    "cart.productId": cart.productId,
                    "cart.count": cart.count,
                }
            }
        )
       res.status(200).json(result)

     }
      catch(err) {
        console.log(err);
        res.status(500).json({
         message:'Не удалось удалить продукт',
        });
    }
}
export const remove = async (req , res ) => {

    console.log('Cart DELETE', req.body)

    try {
        const userId = req.userId;
        const cart = req.body;

        const result = await UserModel.findOneAndUpdate(
            {
                _id: userId,
                "cart.productId": cart.id
            },
           {
            $pull:{
                cart:{
                    productId: cart.id
                }
            }
           }
        )
       res.status(200).json(result)

     }
      catch(err) {
        console.log(err);
        res.status(500).json({
         message:'Не удалось удалить продукт',
        });
    }
}
