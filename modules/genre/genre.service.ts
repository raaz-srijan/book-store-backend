import { Genre } from "./genre.model.js";
import { AppError } from "../../shared/errors/AppError.js";
import slugify from "slugify";

export class GenreService {
    static async addGenre(data: any) {
        const { name, categoryId } = data;

        if (!name) throw new AppError("Genre name is required", 400);

        const normalizedName = name.toLowerCase().trim();

        const existingGenre = await Genre.findOne({ name: normalizedName });
        if (existingGenre) throw new AppError("Genre already exists", 409);

        const baseSlug = slugify(normalizedName, { lower: true, strict: true });
        const uniqueSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;

        return await Genre.create({
            name: normalizedName,
            slug: uniqueSlug,
            category: categoryId || null,
            isActive: true
        });
    }

    static async updateGenre(id: string, data: any) {
        const genre = await Genre.findById(id);
        if (!genre) throw new AppError("Genre not found", 404);

        const { name, categoryId, isActive } = data;
        const updateData: any = {};

        if (name) {
            const normalizedName = name.toLowerCase().trim();

            const duplicate = await Genre.findOne({ name: normalizedName, _id: { $ne: id } });
            if (duplicate) throw new AppError("Genre name already exists", 409);

            updateData.name = normalizedName;
            updateData.slug = slugify(normalizedName, { lower: true, strict: true }) +`-${Math.floor(1000 + Math.random() * 9000)}`;
        }

        if (categoryId) updateData.category = categoryId;
        if (typeof isActive === "boolean") updateData.isActive = isActive;

        return await Genre.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
    }

    static async deleteGenre(id: string) {
        const genre = await Genre.findByIdAndDelete(id);
        if (!genre) throw new AppError("Genre not found", 404);
        return genre;
    }

    static async getGenres() {
        const genres = await Genre.find({ isActive: true }).populate("category", "name");
        if (!genres.length) throw new AppError("No genres found", 404);
        return genres;
    }

    static async getAllGenres() {
        return await Genre.find().populate("category", "name").sort({ createdAt: -1 });
    }

    static async getGenreById(id: string) {
        const genre = await Genre.findById(id).populate("category", "name");
        if (!genre) throw new AppError("Genre not found", 404);
        return genre;
    }

    static async toggleGenreActive(id: string) {
        const genre = await Genre.findById(id);
        if (!genre) throw new AppError("Genre not found", 404);

        genre.isActive = !genre.isActive;
        await genre.save();
        return genre;
    }
}