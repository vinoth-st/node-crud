const Product = require('../models/products')

const list = async (req, res) => {
    let result = await Product.find();

    if(result){
        res.status(200).json({'status': true, 'message': `${result.length} record(s) found`, result: result})
    }else{
        res.status(200).json({'status': false, 'message': 'Failed', result: []})
    }
}

const create = async (req, res) => {
    const request = req.body;
    if (req.file) {
        request.image = req.file.path;
    }

    let result = await Product.create(request);

    if(result){
        res.status(200).json({'status': true, 'message': 'Created successfully', result: result })
    }else{
        res.status(200).json({'status': false, 'message': 'Failed', result: []})
    }
}

const update =  async (req, res) => {
    const request = req.body;
    if (req.file) {
        request.image = req.file.path;
    }
    let result = await Product.findByIdAndUpdate(req.params.id, request);

    if(result){
        res.status(200).json({'status': true, 'message': 'Updated successfully', result: result})
    }else{
        res.status(200).json({'status': false, 'message': 'Failed', result: []})
    }
}

const destroy = async (req, res) => {
    let result = await Product.findByIdAndDelete(req.params.id);
    if(result){
        let data = await Product.find();
        res.status(200).json({'status': true, 'message': 'Deleted successfully', result: data})
    }else{
        res.status(200).json({'status': false, 'message': 'Failed', result: []})
    }
}

const uploads =  async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ status: false, message: 'No files uploaded' });
    }
    
    const imagePaths = req.files.map(file => file.path);
    const products = await Product.findByIdAndUpdate(
        req.params.id, 
        { $push: { imageUrl: imagePaths } }, // Add new image URL to the array
        { new: true, runValidators: true }
    );
    
    res.status(200).json({ status: true, message: 'Files uploaded successfully', imageUrls: products });
}

module.exports = {
    list,
    create,
    update,
    destroy,
    uploads
}