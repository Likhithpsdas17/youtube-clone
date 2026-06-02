import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js"
import authRoutes from "./src/routes/authRoutes.js";
import channelRoutes from "./src/routes/channelRoutes.js";
import videoRoutes from "./src/routes/videoRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("YouTube Clone API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res)=>{
    console.log(`server connected on port ${PORT}`);
});