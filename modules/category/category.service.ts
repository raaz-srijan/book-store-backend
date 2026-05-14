import { AppError } from "../../shared/errors/AppError.js";
import { Category } from "./category.model.js";
import slugify from "slugify";

export class CategoryService {
    static async addCategory(data: any) {
        const { name } = data;

        if (!name)
            throw new AppError("Please fill the required field", 400);

        const normalizeCat = name.toLowerCase().trim();
        const checkCat = await Category.findOne({ name: normalizeCat });

        if (checkCat)
            throw new AppError("Category already added with the same name", 409);

        const baseSlug = slugify(name, { lower: true, strict: true });
        const uniqueSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;

        const newCat = await Category.create({ name: normalizeCat, slug: uniqueSlug, isActive: false });

        return newCat;
    }

    static async updateCategory(id: string, data: any) {

        const checkCat = await Category.findById(id);

        if (!checkCat)
            throw new AppError("Category not found", 404);

        const { name } = data;
        const updateData: any = {};

        if (name) {
            const normalizeCat = name.toLowerCase().trim();
            const existCat = await Category.findOne({ name: normalizeCat, _id: { $ne: id } });

            if (existCat)
                throw new AppError("Category name already exists", 409);

            updateData.name = normalizeCat;
            updateData.isActive = false;
        }

        const updateCat = await Category.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
        return updateCat;
    }

    static async deleteCategory(id: string) {
        const existCat = await Category.findByIdAndUpdate(id);

        if (!existCat)
            throw new AppError("Category not found", 404);

        return existCat;
    }

    static async getAllCategories() {
        const categories = await Category.find();

        if (!categories || categories.length === 0)
            throw new AppError("No categories available", 404);

        return categories;
    }

    static async getCategories() {
        const categories = await Category.find({ isActive: true });

        if (!categories || categories.length === 0)
            throw new AppError("No categories available", 404);

        return categories;
    }

    static async getCategoryById(id: string) {
        const category = await Category.findById(id);

        if (!category)
            throw new AppError("Category not found", 404);

        return category;
    }


    static async toggleCatActive(id: string) {
    const category = await Category.findById(id);

    if (!category) {
        throw new AppError("Category not found", 404);
    }

    category.isActive = !category.isActive;
    await category.save();

    return category;
}
}