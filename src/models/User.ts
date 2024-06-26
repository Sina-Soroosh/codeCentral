import mongoose from "mongoose";
require("./Question");
require("./Answer");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "هنوز بیوگرافی توسط کاربر نوشته نشده است!",
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
      required: true,
    },
    refreshToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("questions", {
  localField: "_id",
  foreignField: "user",
  ref: "Question",
});

schema.virtual("answers", {
  localField: "_id",
  foreignField: "user",
  ref: "Answer",
});

const model = mongoose.models.User || mongoose.model("User", schema);

export default model;
