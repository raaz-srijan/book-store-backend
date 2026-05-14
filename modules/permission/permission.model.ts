import mongoose, { Document, Model, mongo, Schema } from "mongoose";

export interface IPermission extends Document {
    name:string;
    group:string;
    isActive:boolean;
    createdAt:Date;
    updatedAt:Date;
}

const permissionSchema:Schema<IPermission> = new Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },

    group:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
    },

    isActive:{
        type:Boolean,
        default:true,
    }
}, {timestamps:true});


export const Permission:Model<IPermission> = mongoose.models.Permission || mongoose.model<IPermission>("Permission", permissionSchema);