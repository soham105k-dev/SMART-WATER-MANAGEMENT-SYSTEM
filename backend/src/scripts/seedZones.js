// src/scripts/seedZones.js
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Zone from "../models/zone.model.js";
import connectDB from "../config/db.js";

const seedZones = async () => {
  try {
    // Connect to DB
    await connectDB();

    // Clear existing zones
    await Zone.deleteMany();
    console.log(" Existing zones cleared");

    // Zone seed data (Solapur-based)
    const zones = [
      {
        name: "North Solapur",
        supply_status: "NORMAL",
        isActive: true,
      },
      {
        name: "South Solapur",
        supply_status: "NORMAL",
        isActive: true,
      },
      {
        name: "MIDC Area",
        supply_status: "NORMAL",
        isActive: true,
      },
      {
        name: "Railway Area",
        supply_status: "NORMAL",
        isActive: true,
      },
      {
        name: "Old City",
        supply_status: "NORMAL",
        isActive: true,
      },
    ];

    // Insert zones
    const createdZones = await Zone.insertMany(zones);

    console.log(" Zones seeded successfully");
    createdZones.forEach((zone) =>
      console.log(` ${zone.name} → ${zone._id}`)
    );

    process.exit(0);
  } catch (error) {
    console.error(" Zone seeding failed:", error);
    process.exit(1);
  }
};

// Run seed
seedZones();
