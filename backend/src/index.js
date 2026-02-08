import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import ConnectDB from "./config/db.js";
import app from "./app.js";

ConnectDB()
  .then(async () => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
