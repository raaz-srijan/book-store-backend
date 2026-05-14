import mongoose, { Document, Model, Schema } from "mongoose";

export interface IGenre extends Document {
    name: string;
    slug: string;
    category?: mongoose.Types.ObjectId; 
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const genreSchema: Schema<IGenre> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
        
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    isActive: {
        type: Boolean,
        default: true 
    },
}, { timestamps: true });

export const Genre: Model<IGenre> = mongoose.models.Genre || mongoose.model<IGenre>("Genre", genreSchema);