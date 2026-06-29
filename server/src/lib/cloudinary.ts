import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/index.js';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

interface UploadResult {
  url: string;
  publicId: string;
}

export async function uploadToCloudinary(file: Express.Multer.File, folder: string = 'uploads'): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `shodhan/${folder}`,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) reject(error);
        else if (result) resolve({ url: result.secure_url, publicId: result.public_id });
        else reject(new Error('Upload failed'));
      }
    );
    uploadStream.end(file.buffer);
  });
}
