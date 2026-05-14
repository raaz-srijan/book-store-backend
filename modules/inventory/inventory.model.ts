import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IInventory extends Document {
    bookId: Types.ObjectId;
    vendorId:Types.ObjectId;
    price:number;
    type: "paperback" | "hardcover"
    stock:number;
    stockAlert:number;
    sku:string;
    isActive: boolean;
    createdAt:Date;
    updatedAt:Date;
}

const inventorySchema:Schema<IInventory> = new Schema({
    
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true,
        index:true,
    },

    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true,
        index:true,
    },

    type: {
        type: String,
        enum: ["paperback", "hardcover"],
        required: true,
    },

    price:{
        type:Number,
        required:true,
        min:0,
    },

    stock:{
        type:Number,
        required:true,
        min:0,
    },

    stockAlert:{
        type:Number,
        default:5,
        min:0
    },

    sku:{
        type:String,
        trim:true,
        unique: true, 
        sparse: true
    },
    
    isActive:{
        type:Boolean,
        default:false,
    },
}, {timestamps:true});

inventorySchema.index({ bookId: 1, type: 1, price: 1 });

export const Inventory:Model<IInventory> = mongoose.models.Inventory || mongoose.model<IInventory>("Inventory", inventorySchema);

