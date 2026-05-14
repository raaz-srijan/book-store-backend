import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IRole extends  Document {
    name:string;
    permissions:Types.ObjectId[];
    createdAt:Date;
    updatedAt:Date;
}

const roleSchema:Schema<IRole> = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },

    permissions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Permission",
        required:true,
    }],
}, {timestamps:true});

export const Role:Model<IRole> = mongoose.models.Role || mongoose.model<IRole>("Role", roleSchema);