import{body } from 'express-validator'

export const registerValidation = [
    body('email','Неверный формат почты').isEmail(),
    body('password','Пароль должен быть минимум 5 сисмволов').isLength({min:5}),
    body('fullName','Укажите имя').isLength({min:3}),
    body('avatarUr','Неверная ссылка на аватарку').optional().isURL(),
]; 