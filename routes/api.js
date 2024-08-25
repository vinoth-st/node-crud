const productController = require('../controllers/productController');
const { validationRules, validate } = require('../validator/validation.js');
const upload = require('../middleware/upload'); // Import the upload middleware

const api = async (app) => {
    app.get('/products', productController.list)
    app.post('/products',  upload.single('file'), validationRules, validate, productController.create)
    app.put('/products/:id',  upload.single('file'), validationRules, validate, productController.update)
    app.delete('/products/:id', productController.destroy)
    app.post('/products/:id/upload',upload.array('image',10), productController.uploads)

}

module.exports = api