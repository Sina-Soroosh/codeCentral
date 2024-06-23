import { ObjectId } from "mongoose";

export type Tag = {
  _id: ObjectId;
  title: string;
  shortName: string;
};
