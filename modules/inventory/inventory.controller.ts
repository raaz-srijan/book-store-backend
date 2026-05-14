import { InventoryService } from "./inventory.service.js";
import { AppError } from "../../shared/errors/AppError.js";
import type { Request, Response } from "express";
import { catchAsync } from "../../shared/errors/catchAsync.js";

export class InventoryController {

    static addInventory = catchAsync(async (req: Request, res: Response) => {
        const inventory = await InventoryService.addInventory(req.body);
        res.status(201).json({
            success: true,
            message: "Inventory item created successfully",
            data: inventory
        });
    });

    // 2. Update price, stock, or stock alert thresholds
    static updateInventory = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) throw new AppError("Inventory ID is required", 400);

        const updated = await InventoryService.updateInventory(id.toString(), req.body);
        res.status(200).json({
            success: true,
            message: "Inventory updated",
            data: updated
        });
    });

    static adjustStock = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) throw new AppError("Inventory ID is required", 400);

        const { quantity } = req.body;

        if (typeof quantity !== 'number') {
            throw new AppError("Quantity must be a number", 400);
        }

        const adjusted = await InventoryService.adjustStock(id.toString(), quantity);
        res.status(200).json({
            success: true,
            message: `Stock adjusted. New total: ${adjusted.stock}`,
            data: adjusted
        });
    });

    // 4. Get all inventory for a specific book (Show all vendor offers)
    static getBookInventory = catchAsync(async (req: Request, res: Response) => {
        const { bookId } = req.params;
        if (!bookId)
            return res.status(404).json({ success: false, message: "Invalid id" });
        const listings = await InventoryService.getInventoryByBook(bookId.toString());
        res.status(200).json({
            success: true,
            count: listings.length,
            data: listings
        });
    });

    // 5. Get items that are running low (Admin Dashboard)
    static getLowStock = catchAsync(async (req: Request, res: Response) => {
        const alerts = await InventoryService.getLowStockAlerts();
        res.status(200).json({
            success: true,
            data: alerts
        });
    });

    // 6. Delete an inventory listing
    static deleteInventory = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) throw new AppError("Inventory ID is required", 400);

        await InventoryService.deleteInventory(id.toString());
        res.status(200).json({
            success: true,
            message: "Inventory record removed"
        });
    });
}