import mongoose, { Document, Schema } from 'mongoose';

export interface House {
    title: string;
    description: string;
    comments: Comment[];
    location: string;
    photos: string[];
    defaultImg: string;
    rating: number;
    space: string;
}

export interface Comment {
    text: string;
    author: string;
    rating: number;
}

export interface HouseModel extends House, Document {}

const CommentSchema: Schema = new Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true }
});

const HouseSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        comments: [CommentSchema], // Use CommentSchema here
        location: { type: String, required: true },
        photos: [{ type: String, required: false }],
        defaultImg: { type: String, required: false },
        rating: { type: Number, required: true },
        space: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<HouseModel>('House', HouseSchema);
