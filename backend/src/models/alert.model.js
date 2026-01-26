import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    zone_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      required: true,
    },

    type: {
      type: String,
      enum: ["LOW_PRESSURE", "LEAKAGE", "UNEVEN_DISTRIBUTION"],
      required: true,
    },

    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "RESOLVED"],
      default: "ACTIVE",
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    resolved_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  }
);

export default mongoose.model("Alert", alertSchema);
