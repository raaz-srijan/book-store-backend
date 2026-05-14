import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IUser extends Document {
    name:string;
    email:string;
    password:string;
    isVerified:boolean;
    roleId:Types.ObjectId;
    provider: "local" | "google";
    refreshToken: string;
    createdAt:Date;
    updatedAt:Date;
}

const userSchema: Schema<IUser> = new Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },

    password:{
        type:String,
        required:true,
        minlength:6,
        select:false,
    },

    isVerified:{
        type:Boolean,
        default:false,
    },

    roleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role",
        required:true,
    },

    provider:{
        type:String,
        enum:["local", "google"],
        default:"local",
    },

    refreshToken:{
        type:String,
    },
}, {timestamps:true});


export const User:Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);