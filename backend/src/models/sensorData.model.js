import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema(
  {
    pressure: {
      type: Number,
      required: true,
    },

    flow: {
      type: Number,
      required: true,
    },

    zone_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const SensorData = mongoose.model("SensorData", sensorDataSchema);
