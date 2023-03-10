import { Date, Types } from "mongoose";

export interface Movie{
    name: string;
    duration: number;
    rating: number;
    genre: string[];
    tagline: string;
    created_at?: Date;
    updated_at?: Date;
}