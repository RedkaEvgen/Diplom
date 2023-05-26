import{ body } from 'express-validator';

export const loginValidation = [
    body('email','Неверный формат почты').isEmail(),
    body('password','Пароль должен быть минимум 5 сисмволов').isLength({min:5}),

];
export const registerValidation = [
    body('email','Неверный формат почты').isEmail(),
    body('password','Пароль должен быть минимум 5 сисмволов').isLength({min:5}),
    body('fullName','Укажите имя').isLength({min:3}),
    body('avatarUr','Неверная ссылка на аватарку').optional(),
];
export const productCreateValidation = [
    body('title','Введите заголовок статьи').isLength({min:3}).isString(),
    body('text','Введите текст статьи').isLength({min:3}).isString(),
    body('tags','Неверный формат тэгов(укажите масив)').optional().isString(),
    body('imageUrl','Неверная ссылка на изображение').optional(),
];
