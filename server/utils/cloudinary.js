const dotenv = require('dotenv');
const cloudinaryModules = require('cloudinary');

dotenv.config();

const cloudinary = cloudinaryModules.v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
