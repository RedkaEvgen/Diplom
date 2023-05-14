import UserModel from '../models/User.js';


export const add = async (req , res ) => {
 try {
    const userId = req.userId;
    const cart = req.body ;
    
    const result = await UserModel.findOneAndUpdate(
        {
            _id: userId
        },
        {
            '$push': {
                cart   
            }
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
    try {
        const userId = req.userId;
        const cart = req.body;
        
        const result = await UserModel.findOneAndUpdate(
            {
                _id: userId,
                "cart.productId":cart.productId
            },
           {
            $pull:{
                cart:{
                    productId:cart.productId 
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
