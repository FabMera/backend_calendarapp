const { response } = require('express');
const { validationResult, check } = require('express-validator');



const validateFields = (req, res = response, next) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        })
    }
    next();
}

const checkName = check('name', 'El nombre es obligatorio').not().isEmpty();
const checkEmail = check('email')
    .not()
    .isEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('El email debe ser un email válido')
    .custom((value) => {
        if (value.includes('@')) {
            return true;
        } else {
            throw new Error('El email debe contener el símbolo @');
        }
    });
const checkPassword = check('password')
    .not()
    .isEmpty()
    .withMessage('El password es obligatorio')
    .isLength({ min: 6 })
    .withMessage('El password debe de ser de 6 caracteres');



module.exports = {
    validateFields,
    checkName,
    checkEmail,
    checkPassword
}