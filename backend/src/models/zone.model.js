import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    supply_status: {
      type: String,
      enum: ["NORMAL", "WARNING", "CRITICAL"],
      default: "NORMAL",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model("Zone", zoneSchema);
