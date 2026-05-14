import mongoose, { Document, Schema, Types, Model } from "mongoose";

export interface IBook extends Document {
    name: string;
    desc: string;
    isbn: string;
    slug: string;
    images: {
        cover: {
            imageUrl: string;
            publicUrl: string;
        };
        gallery: {
            imageUrl: string;
            publicUrl: string;
        }[];
    };
    category: Types.ObjectId;
    genre: Types.ObjectId[];
    author: Types.ObjectId;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const imageSchema = new Schema({
    imageUrl: { type: String, required: true },
    publicUrl: { type: String, required: true }
}, { _id: false });

const bookSchema = new Schema<IBook>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    desc: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    images: {
        cover: { type: imageSchema, required: true },
        gallery: [imageSchema]
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    genre: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Genre",
    }],
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

bookSchema.index({ name: 'text', isbn: 1 });
bookSchema.index({ slug: 1 });

export const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>("Book", bookSchema);