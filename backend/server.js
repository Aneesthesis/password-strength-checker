import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { PasswordStrengthResult } from "./PasswordStrengthModel.js";

config();

const app = express();

app.use(
  cors({
    origin: "*", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/saveResult", async (req, res) => {
  const { password, stepsUntilStrong: steps, name } = req.body;

  try {
    const result = new PasswordStrengthResult({ password, steps, name });
    await result.save();
    res
      .status(201)
      .json({ success: true, message: "Result saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving result" });
  }
});

// Catch-all route for unknown queries
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

mongoose
  .connect(process.env.CONNECTION_URI, { dbName: "password_strength_checker" })
  .then(() => {
    console.log("MONGO JUMBO");
  })
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`serving at http://127.0.0.1:${port}`);
});
