import mongoose from "mongoose";
import TagModel from "./Tag";
import UserModel from "./User";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
      required: true,
    },
    answersCount: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Question || mongoose.model("Question", schema);

export default model;
