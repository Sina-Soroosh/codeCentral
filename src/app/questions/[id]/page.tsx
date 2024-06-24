import React from "react";
import { Metadata } from "next";
import Main from "@/components/templates/Questions/Question/Main/Main";
import { connectToDB } from "@/configs/db";
import QuestionModel from "@/models/Question";
import { Question } from "@/types/Question.types";
import { redirect } from "next/navigation";
import getUser from "@/helpers/getUserServer";
import { AnswerWithoutQuestion } from "@/types/Answer.types";
import AnswerModel from "@/models/Answer";

type QuestionProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: QuestionProps): Promise<Metadata> {
  await connectToDB();

  const question: null | { title: string } = await QuestionModel.findOne({
    shortName: params.id,
  }).lean();

  if (!question) {
    return {};
  }

  return {
    title: `${question.title} - مرکز کد`,
  };
}

async function page({ params }: QuestionProps) {
  await connectToDB();

  const question: null | Question = await QuestionModel.findOne({
    shortName: params.id,
  })
    .populate([
      { path: "user", select: "username" },
      { path: "tags", select: "shortName title" },
    ])
    .lean();

  if (!question) {
    redirect("/questions");
  }

  const answers: AnswerWithoutQuestion[] = await AnswerModel.find({
    question: question._id,
  })
    .populate({ path: "user", select: "username" })
    .sort({ isBest: "desc", isPractical: "desc" })
    .lean();

  let isAdmin = false;
  let isCreator = false;

  const user = await getUser();

  if (user.isLogin !== false) {
    if (user.user._id.toString() === question.user._id.toString()) {
      isCreator = true;
    }

    isAdmin = user.isAdmin;
  }

  return (
    <>
      <Main
        isAdmin={isAdmin}
        isLogin={user.isLogin}
        isCreator={isCreator}
        answers={answers}
        question={question}
      />
    </>
  );
}

export default page;
