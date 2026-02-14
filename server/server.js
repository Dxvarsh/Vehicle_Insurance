import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import { ENV } from "./config/env.js";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Security Headers
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: ENV.CORS_ORIGIN,
    credentials: true
}));

// HTTP Request Logger
app.use(morgan("dev"));

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Test Route
app.get("/api/v1/health-check", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy and running"
    });
});

// Routes import
import authRoutes from "./routes/authRoutes.js";

// Routes declaration
app.use("/api/v1/auth", authRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to Database and start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log(`⚙️  Server is running at port : ${ENV.PORT}`);
        });
    } catch (err) {
        console.log("MongoDB connection failed !!! ", err);
    }
};

startServer();
