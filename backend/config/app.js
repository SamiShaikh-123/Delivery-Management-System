import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import pool from "./config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 Delivery Management System Backend is Running"
    });
});

// Database Test Route
app.get("/api/test-db", async (req, res) => {
    try {
        const connection = await pool.getConnection();

        await connection.ping();

        connection.release();

        res.json({
            success: true,
            message: "✅ Database Connected Successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "❌ Database Connection Failed",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});