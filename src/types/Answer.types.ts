import { ObjectId } from "mongoose";
import { QuestionWithoutBody } from "./Question.types";

export type AnswerWithoutQuestion = {
  _id: ObjectId;
  body: string;
  user: {
    _id: ObjectId;
    username: string;
  };
  createdAt: Date;
  isBest: boolean;
  isPractical: boolean;
};

export type Answer = AnswerWithoutQuestion & {
  question: QuestionWithoutBody;
};
