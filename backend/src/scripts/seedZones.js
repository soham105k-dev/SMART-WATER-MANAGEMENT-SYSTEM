import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Zone from "../models/zone.model.js";
import connectDB from "../config/db.js";

const seedZones = async () => {
  try {
  
    await connectDB();
    await Zone.deleteMany();
    console.log(" Existing zones cleared");

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

seedZones();
