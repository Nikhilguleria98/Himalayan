import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const uploadBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "himalayan-khadu",
        resource_type: "image",
        // Preserve a high-quality original in Cloudinary while allowing the
        // frontend to request an efficiently sized, modern-format delivery.
        transformation: [{ width: 1600, height: 1600, crop: "limit" }],
      },
      (error, result) => {
        if (error) {
          reject(new Error(error.message));
          return;
        }

        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export async function imageUploadUtil(fileOrFiles) {
  const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
  if (files.length > 4) {
    throw new Error("You can upload a maximum of 4 images.");
  }
  return Promise.all(files.map(uploadBuffer));
}

export function optimizedImageUrl(publicId) {
  return cloudinary.url(publicId, {
    secure: true,
    resource_type: "image",
    transformation: [
      { width: 1600, height: 1600, crop: "limit" },
      { fetch_format: "auto", quality: "auto:good" },
    ],
  });
}

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed."));
  }
};
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 4, // Maximum 4 files
    fileSize: 5 * 1024 * 1024, //5 MB per image
  },
}).array("files", 4);
