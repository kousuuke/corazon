import mongoose from "mongoose";

export interface UrlDocument extends mongoose.Document {
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema = new mongoose.Schema<UrlDocument>(
  {
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true, index: true },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Url =
  mongoose.models.Url || mongoose.model<UrlDocument>("Url", urlSchema);
