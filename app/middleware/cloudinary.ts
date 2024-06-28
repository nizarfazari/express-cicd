import { v2 as cloudinary } from 'cloudinary';

const {CLOUD_NAME, API_KEY, API_SECRET} = process.env

cloudinary.config({ 
  cloud_name: 'dcpewaqiq', 
  api_key: '113175327828444', 
  api_secret: '4s3gLke0-KexGrSl_5OjeSBE8uQ' 
});

export default cloudinary;