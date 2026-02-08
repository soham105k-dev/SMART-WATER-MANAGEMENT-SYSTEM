import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import ConnectDB from "./config/db.js";
import app from "./app.js";

ConnectDB()
  .then(async () => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
      console.log("Use POST /api/simulator/start to begin IoT simulation");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
