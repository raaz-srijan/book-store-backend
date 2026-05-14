import type { Request, Response } from "express";
import { CategoryService } from "./category.service.js";
import { catchAsync } from "../../shared/errors/catchAsync.js";

export class CategoryController {
    static addCat = catchAsync(async (req: Request, res: Response) => {
        const newCat = await CategoryService.addCategory(req.body);

        return res.status(201).json({ success: true, message: "Category added successfully", data: newCat });
    });

    static updateCat = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        const update = await CategoryService.updateCategory(id.toString(), req.body);

        return res.status(200).json({ success: true, message: "Category updated successfully", data: update });
    });

    static deleteCat = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        const delCat = await CategoryService.deleteCategory(id.toString());

        return res.status(200).json({ success: true, message: "Category deleted successfully" });
    });

    static getAllCategories = catchAsync(async (req: Request, res: Response) => {
        const categories = await CategoryService.getAllCategories();

        return res.status(200).json({ success: true, message: "Categories fetched successfully", data: categories });
    });

    static getCategories = catchAsync(async (req: Request, res: Response) => {
        const categories = await CategoryService.getCategories();
        return res.status(200).json({ success: true, message: "Categories fetched successfully", data: categories });
    });

    static getCatById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        const category = await CategoryService.getCategoryById(id.toString());
        return res.status(200).json({ success: true, message: "Category fetched successfully", data: category });
    });

    static toggleCat = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });

        const toggledCategory = await CategoryService.toggleCatActive(id.toString());
        return res.status(200).json({ success: true, message: `Category is now ${toggledCategory.isActive ? "Active" : "Inactive"}`, data: toggledCategory });
    });
}