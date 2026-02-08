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

    status: {
      type: String,
      enum: ["NORMAL", "WARNING", "CRITICAL", "ALERT"],
      default: "NORMAL",
    },

    pressure: {
      type: Number,
      default: 2.5,
    },

    flowRate: {
      type: Number,
      default: 0,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
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
