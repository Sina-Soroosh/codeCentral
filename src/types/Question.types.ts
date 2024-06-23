import { ObjectId } from "mongoose";

export type QuestionWithoutBody = {
  title: string;
  tags: { _id: ObjectId; title: string; shortName: string }[];
  user: {
    _id: ObjectId;
    username: string;
  };
  createAt: Date;
};

export type Question = QuestionWithoutBody & { body: string };
