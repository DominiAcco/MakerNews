import mongoose, { Schema, models } from "mongoose";

const PublicationSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["published", "archived"],
    },
    image_url: { type: String, required: false },
  },
  { timestamps: true }
);

export default models.Publication || mongoose.model("Publication", PublicationSchema);
