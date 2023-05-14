import ProductModel from '../models/Product.js';

export const getAll = async (req,res) => {
    try{
        const product = await ProductModel.find().populate('user').exec();

        res.json(product);
    }catch (err){
        console.log(err);
        res.status(500).json({
         message:'Не удалось получить статьи',
      });

    }
};

export const getOne = async (req,res) => {
    try{
        const productId = req.params.id;
        
        const product = await ProductModel.findOneAndUpdate(
        {
            _id: productId,
        },
        {
            $inc:{ viewsCount: 1 },
        },
        {
            returnDocument: 'after',
        },
        
     );  
     if (!product){
        return res.status(404).json({
            message:'Статья не найдена',
        });
    } 
    
    res.json(product);

    }catch (err){
        console.log(err);
        res.status(500).json({
         message:'Не удалось получить статьи',
      });

    }
};
export const create = async (req, res)=>{
    try{
        const doc = new ProductModel({
           title: req.body.title,
           text: req.body.title,
           imageUrl: req.body.imageUrl,
           tags: req.body.tags,
           user: req.userId,
        });

        const product = await doc.save();

        res.json(product);
    
    }catch (err){
        console.log(err);
        res.status(500).json({
         message:'Не удалось создать статью',
      });
    }
};
export const remove = async (req, res) => {
    try {
        const productId = req.params.id;

        
        const result = await ProductModel.findOneAndDelete(
            {
            _id: productId , 
            },
        );

        res.json({
            success: true,
        });

        
    }catch (err){
        console.log(err);
        res.status(500).json({
         message:'Не удалось удалить статью ',
        });
    }
    
};
export const update = async (req, res) => {
    try {
        const productId = req.params.id;

        
        const result = await ProductModel.findOneAndUpdate(
            {
            _id: productId , 
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags,
            },
        );

        res.json({
            success: true,
        });

        
    }catch (err){
        console.log(err);
        res.status(500).json({
         message:'Не удалось обновить статью ',
        });
    }
    
};