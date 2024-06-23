import mongoose from "mongoose";
require("./Question");
require("./User");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: mongoose.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    isBest: {
      type: Boolean,
      default: false,
      required: true,
    },
    isPractical: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Answer || mongoose.model("Answer", schema);

export default model;
