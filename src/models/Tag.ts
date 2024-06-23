import mongoose from "mongoose";
require("./Question");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("questions", {
  localField: "_id",
  foreignField: "tags",
  ref: "Question",
});

const model = mongoose.models.Tag || mongoose.model("Tag", schema);

export default model;
