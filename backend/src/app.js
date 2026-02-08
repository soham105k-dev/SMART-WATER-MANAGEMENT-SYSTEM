import express from "express"
import cors from "cors"
import iotRoutes from "./routes/iot.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import simulatorRoutes from "./routes/simulator.routes.js";

const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true 
}))
app.use(express.json({limit:"162kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use("/api", iotRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/simulator", simulatorRoutes);

export default app