import mongoose, { Document, Model, Schema } from "mongoose";


export interface ICategory extends Document {
    name:string;
    slug:string;
    isActive:boolean;
    createdAt:Date;
    updatedAt:Date;
};

const categorySchema:Schema<ICategory> = new Schema({

    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        capitalize:true,
    },

    slug:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },

    isActive:{
        type:Boolean,
        default:false
    },
}, {timestamps:true});

export const Category:Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>("Category", categorySchema);