import ProductModel from '../models/Product.js';

export const getAll = async (req,res) => {
    try{
        const product = await ProductModel.find().exec();
        res.json(product);
    }catch (err){
        console.log(err);
        res.status(500).json({
         message:'Не вдалось знайти жодного продукту.',
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
            message:'Продукт не знайдений',
        });
    }

    res.json(product);

    }catch (err){
        console.log(err);
        res.status(500).json({
         message:'Не удалось получить продукт',
      });

    }
};
export const create = async (req, res)=>{

    try{
        const doc = new ProductModel({
           title: req.body.title,
           text: req.body.text,
           price: req.body.price,
           imageUrl: req.body.imageUrl,
           tags: req.body.tags,
        });

        const product = await doc.save();
        res.json(product);
    }catch (err){
        console.log(err);
        res.status(500).json({
         message:'Не удалось створити продукт',
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
            data: result
        });


    }catch (err){
        console.log(err);
        res.status(500).json({
         message:'Не вдалось видалити продукт',
        });
    }

};
export const update = async (req, res) => {
    const textData = JSON.parse(req.body.data);
    try {
        const productId = req.params.id;
        const result = await ProductModel.findOneAndUpdate(
            {
            _id: productId ,
            },
            {
                title: textData.title,
                text: textData.text,
                price: textData.price,
                imageUrl: req.body.imageUrl,
                tags: textData.tags,
            },
        );
        res.json({
            success: true,
            data: result,
        });


    }catch (err){
        console.log(err);
        res.status(500).json({
         message:'Не вдалось обновити продукт',
        });
    }

};
