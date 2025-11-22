// models/Publication.ts
import mongoose, { Schema, models } from "mongoose";

const CreatedBySchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
  },
  { _id: false }
);

const PublicationSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["published", "archived"],
    },
    createdBy: { type: CreatedBySchema, required: true }
  },
  { timestamps: true }
);

export default models.Publication || mongoose.model("Publication", PublicationSchema);
