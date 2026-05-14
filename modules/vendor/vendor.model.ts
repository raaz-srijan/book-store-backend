import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IVendor extends Document {
    userId: Types.ObjectId;
    storeName: string;
    licenseNo: string;
    isPending:boolean;
    isApproved: boolean;
    address: {
        state: string,
        city: string,
        tole: string,
    },
    createdAt: Date;
    updatedAt: Date;
}

const addressSchema = new Schema({
    state: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    tole: {
        type: String,
        required: true,
        trim: true,
    },
}, { _id: false });

const vendorSchema: Schema<IVendor> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    storeName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    licenseNo: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        unique: true,
        select:false,
    },

    address: {
        type: addressSchema
    },

    isPending:{
        type:Boolean,
        default:true,
    },

    isApproved: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


export const Vendor: Model<IVendor> = mongoose.models.Vendor || mongoose.model<IVendor>("Vendor", vendorSchema);