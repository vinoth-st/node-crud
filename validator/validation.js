
const { body, validationResult } =  require('express-validator');

const validationRules = [
    body('name')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters')
        .notEmpty().withMessage('Name field is required'),
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .notEmpty().withMessage('Price field is required'),
    body('description')
        .isString().withMessage('Description must be a string')
        .isLength({ max: 500 }).withMessage('Description field allowed maximum 500 characters'),
];

const validate = (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        const formaterror = {};
        error.array().forEach(error => {
            formaterror[error.path] = error.msg;
        });
        return res.status(400).json({ error: formaterror });
    }
    next();
}


module.exports = {
    validationRules,
    validate
};