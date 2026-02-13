import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

const port = process.env.PORT || 4000;
connectDB();

// I added process.env.FRONTEND_URL here.
// You will need to add this variable to Vercel later!
const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// api endpoints
app.get("/", (req, res) => {
  res.send("api working...");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Prevent app.listen from running in Vercel's serverless production environment
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log(`server started AT port : ${port}`));
}

// THE FIX: Use ES Module export instead of CommonJS
export default app;
