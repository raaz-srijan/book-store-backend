import { Inventory } from "./inventory.model.js";
import { AppError } from "../../shared/errors/AppError.js";

export class InventoryService {
    static async addInventory(data: any) {
        const { bookId, vendorId, type, price, stock, stockAlert, sku } = data;

        const existingInventory = await Inventory.findOne({ bookId, vendorId, type });
        if (existingInventory) {
            throw new AppError(`Inventory for this ${type} book already exists for this vendor. Update the stock instead.`, 409);
        }

        const finalSku = sku || `SKU-${bookId.toString().slice(-4)}-${type.toUpperCase().slice(0, 2)}-${Math.floor(1000 + Math.random() * 9000)}`;

        const newInventory = await Inventory.create({
            bookId,
            vendorId,
            type,
            price,
            stock,
            stockAlert,
            sku: finalSku,
            isActive: true
        });

        return newInventory;
    }

    static async updateInventory(id: string, data: any) {
        const inventory = await Inventory.findById(id);
        if (!inventory) throw new AppError("Inventory record not found", 404);

        const updatedInventory = await Inventory.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        ).populate("bookId", "name");

        return updatedInventory;
    }

    static async adjustStock(id: string, quantity: number) {
        const inventory = await Inventory.findById(id);
        if (!inventory) throw new AppError("Inventory record not found", 404);

        const newStock = inventory.stock + quantity;
        if (newStock < 0) throw new AppError("Insufficient stock for this operation", 400);

        inventory.stock = newStock;
        await inventory.save();

        return inventory;
    }

    static async getLowStockAlerts() {
        return await Inventory.find({
            $expr: { $lte: ["$stock", "$stockAlert"] },
            isActive: true
        }).populate("bookId", "name").populate("vendorId", "name");
    }

    static async getInventoryByBook(bookId: string) {
        return await Inventory.find({ bookId, isActive: true })
            .populate("vendorId", "name")
            .sort({ price: 1 });
    }

    static async deleteInventory(id: string) {
        const result = await Inventory.findByIdAndDelete(id);
        if (!result) throw new AppError("Inventory record not found", 404);
        return result;
    }
}