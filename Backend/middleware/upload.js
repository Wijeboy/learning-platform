const multer = require('multer');
const path = require('path');

// Set up storage for images
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Set up storage for PDFs
const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/pdfs/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter for images
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// File filter for PDFs
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'));
  }
};

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: imageFilter
});

const uploadPDF = multer({
  storage: pdfStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: pdfFilter
});

// Combined upload for products (image + pdf)
const uploadProduct = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === 'image') {
        cb(null, 'uploads/images/');
      } else if (file.fieldname === 'pdfResource') {
        cb(null, 'uploads/pdfs/');
      }
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (file.fieldname === 'image') {
      imageFilter(req, file, cb);
    } else if (file.fieldname === 'pdfResource') {
      pdfFilter(req, file, cb);
    } else {
      cb(null, true);
    }
  }
});

module.exports = {
  uploadImage,
  uploadPDF,
  uploadProduct
};