import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import ConnectDB from "./config/db.js";
import app from "./app.js";
import Zone from "./models/zone.model.js";
import { startSimulation } from "./services/iotSimulator.service.js";

ConnectDB()
  .then(async () => {
    app.listen(process.env.PORT || 6000, async () => {
      console.log(`Server is running on port ${process.env.PORT || 6000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
