import { Author } from "./author.model.js";
import { deleteImageFromCloudinary, uploadImage } from "../../infrastructure/uploadImage.js";
import { AppError } from "../../shared/errors/AppError.js";
import slugify from "slugify";

export class AuthorService {
    static async addAuthor(data: any, file: any) {
        const { name, bio } = data;

        if (!name || !bio) {
            throw new AppError("Name and bio are required fields", 400);
        }

        if (bio.length > 20000) {
            throw new AppError("Bio is too long (max 20000 characters)", 400);
        }

        const existingAuthor = await Author.findOne({
            name: { $regex: new RegExp(`^${name}$`, "i") },
            bio: bio.substring(0, 50)
        });

        if (existingAuthor) {
            throw new AppError("An author with this name and similar bio already exists.", 409);
        }

        let imageData = { imageUrl: "", publicUrl: "" };

        try {
            if (file) {
                const upload = await uploadImage(file.path);
                imageData = {
                    imageUrl: upload.secure_url,
                    publicUrl: upload.public_id
                };
            }

            const baseSlug = slugify(name, { lower: true, strict: true });
            const uniqueSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;

            return await Author.create({
                name,
                bio,
                slug: uniqueSlug,
                image: imageData,
                isVerified: false
            });

        } catch (error: any) {
            throw new AppError(error.message || "Failed to add author", 500);
        }
    }


    static async updateAuthor(id: string, data: any, file: any) {
        const author = await Author.findById(id);
        if (!author) throw new AppError("Author not found", 404);

        const { name, bio } = data;
        const updateData: any = {};
        if (name) updateData.name = name;
        if (bio) updateData.bio = bio;

        if (file) {
            if (author.image?.publicUrl) {
                await deleteImageFromCloudinary(author.image.publicUrl).catch(console.error);
            }

            const upload = await uploadImage(file.path);
            updateData.image = {
                imageUrl: upload.secure_url,
                publicUrl: upload.public_id
            };
        }

        updateData.isVerified = false;

        return await Author.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    static async deleteAuthor(id: string) {
        const author = await Author.findById(id);
        if (!author) throw new AppError("Author not found", 404);

        if (author.image?.publicUrl) {
            await deleteImageFromCloudinary(author.image.publicUrl).catch(err =>
                console.error("Cloudinary cleanup failed:", err)
            );
        }

        await Author.findByIdAndDelete(id);
    }

    static async getAuthors() {
        const authors = await Author.find({ isVerified: true }).sort({ name: 1 });
        if (!authors.length) throw new AppError("No verified authors found", 404);
        return authors;
    }

    static async getAllAuthors() {
        const authors = await Author.find().sort({ createdAt: -1 });
        if (!authors.length) throw new AppError("No authors found", 404);
        return authors;
    }

    static async getAuthorById(id: string) {
        const author = await Author.findById(id);
        if (!author) throw new AppError("Author not found", 404);
        return author;
    }
}