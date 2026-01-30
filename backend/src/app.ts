import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import activitiesRoutes from "./routes/activityRoute";
import authMiddleware from "./middleware/auth";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use("/api/activities", activitiesRoutes);

export default app;
