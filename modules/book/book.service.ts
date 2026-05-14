import { Book } from "./book.model.js";
import { AppError } from "../../shared/errors/AppError.js";
import slugify from "slugify";

export class BookService {
    static async addBook(data: any) {
        const { name, isbn, desc, images, category, genre, author } = data;

        if (!name || !isbn || !category || !author) {
            throw new AppError("Missing required book details", 400);
        }

        const existingIsbn = await Book.findOne({ isbn });
        if (existingIsbn) throw new AppError("A book with this ISBN already exists", 409);

        const baseSlug = slugify(name, { lower: true, strict: true });
        const uniqueSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;

        const newBook = await Book.create({
            name,
            desc,
            isbn,
            slug: uniqueSlug,
            images,
            category,
            genre: genre || [],
            author,
            isVerified: false
        });

        return newBook;
    }

    static async updateBook(id: string, data: any) {
        const book = await Book.findById(id);
        if (!book) throw new AppError("Book not found", 404);

        const { name, images, genre, ...rest } = data;
        const updateData: any = { ...rest };

        if (name) {
            updateData.name = name;
            updateData.slug = slugify(name, { lower: true, strict: true }) + `-${Math.floor(1000 + Math.random() * 9000)}`;
        }

        if (images) {
            updateData.images = { ...book.images, ...images };
        }

        if (genre) updateData.genre = genre;

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).populate("category author genre", "name");

        return updatedBook;
    }

    static async getBooks(query: any = {}) {
        const filter: any = { isVerified: true };

        if (query.category) filter.category = query.category;
        if (query.author) filter.author = query.author;

        return await Book.find(filter)
            .populate("category author", "name")
            .populate("genre", "name")
            .sort({ createdAt: -1 });
    }

    static async getBookBySlug(slug: string) {
        const book = await Book.findOne({ slug, isVerified: true })
            .populate("category author", "name")
            .populate("genre", "name");

        if (!book) throw new AppError("Book not found", 404);
        return book;
    }

    static async toggleVerification(id: string) {
        const book = await Book.findById(id);
        if (!book) throw new AppError("Book not found", 404);

        book.isVerified = !book.isVerified;
        await book.save();
        return book;
    }

    static async deleteBook(id: string) {
        const book = await Book.findByIdAndDelete(id);
        if (!book) throw new AppError("Book not found", 404);
        return book;
    }
}