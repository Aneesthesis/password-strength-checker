import mongoose from "mongoose";

const passwordStrengthSchema = new mongoose.Schema(
  {
    password: String,
    steps: Number,
    name: String,
  },
  {
    timeStamps: true,
  }
);

export const PasswordStrengthResult = mongoose.model(
  "PasswordStrength",
  passwordStrengthSchema
);
