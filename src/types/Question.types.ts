import { ObjectId } from "mongoose";

export type QuestionWithoutBody = {
  _id: ObjectId;
  title: string;
  shortName: string;
  tags: { _id: ObjectId; title: string; shortName: string }[];
  user: {
    _id: ObjectId;
    username: string;
  };
  answersCount: number;
  createdAt: Date;
};

export type Question = QuestionWithoutBody & { body: string };
