const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder where files will be stored
    },
    filename: function (req, file, cb) {
        console.log(file.originalname)
        cb(null, file.originalname); // Unique file name
    }
});

// File filter function
const fileFilter = (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('application/pdf')) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type. Only images and PDFs are allowed.'), false); // Reject file
    }
};
  
// Create upload middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // Limit file size to 2MB
    }
});

// Create upload middleware
module.exports = upload;
