import {v2 as cloudinary} from "cloudinary";
import fs from "fs/promises";

export const uploadImage = async(imagePath:string) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, { folder: "new-bookstore", transformation: [
        { width: 800, height: 1200, crop: "fill", gravity: "center" }, 
        { quality: "auto", fetch_format: "auto" } 
    ] });
        await fs.unlink(imagePath);
        console.log(`Image uploaded successfully`);
        return result;
    } catch (error: any) {
        console.error("Error uploading image:", error);
        throw error;
    }
}


export const deleteImageFromCloudinary = async (publicId:string) => {
    try {
          console.log("Attempting to delete image with public ID:", publicId); 
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary delete result:", result); 
        if (result.result === 'ok') {
            console.log("Image deleted successfully from Cloudinary");
        } else {
            console.error("Failed to delete image from Cloudinary:", result);
            throw new Error("Failed to delete image from Cloudinary");
        }
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error); 
        throw error; 
    }
}