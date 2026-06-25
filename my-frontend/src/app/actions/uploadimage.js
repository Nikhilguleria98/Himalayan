"use server"

import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_url: process.env.CLOUDINARY_URL
});

export async function uploadImage(file) {
  try {
    const fileBuffer = await file.arrayBuffer()
    const base64String = Buffer.from(fileBuffer).toString("base64")
    const mimeType = file.type || "application/octet-stream"
    const dataURI = `data:${mimeType};base64,${base64String}`

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(dataURI, { resource_type: "auto" }, (error, result) => {
        if (error) {
          reject(new Error(`Cloudinary upload error: ${error.message}`))
        } else {
          resolve(result)
        }
      })
    })

    return result.secure_url
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    throw new Error(`Image upload failed: ${error.message}`)
  }
}