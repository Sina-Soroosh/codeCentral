import UserPanel from "@/components/layout/UserPanel/UserPanel";
import SetCookie from "@/components/modules/SetCookie/SetCookie";
import Main from "@/components/templates/PanelUser/Main/Main";
import getUser from "@/helpers/getUserServer";
import AnswerModel from "@/models/Answer";
import QuestionModel from "@/models/Question";
import { Answer } from "@/types/Answer.types";
import { QuestionWithoutBody } from "@/types/Question.types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "پیشخوان - مرکز کد",
};

async function page() {
  const user = await getUser();

  if (user.isLogin === false) {
    redirect("/login");
  }

  const questions: QuestionWithoutBody[] = await QuestionModel.find(
    { user: user.user._id },
    "user title tags createdAt answersCount shortName"
  )
    .populate([
      { path: "user", select: "username" },
      { path: "tags", select: "shortName title" },
    ])
    .sort({ createdAt: "desc" })
    .lean();

  const answers: Answer[] = await AnswerModel.find(
    { user: user.user._id },
    "_id createdAt question isBest isPractical"
  )
    .populate({
      path: "question",
      select: "user title tags createdAt answersCount shortName",
      populate: [
        { path: "user", select: "username" },
        { path: "tags", select: "shortName title" },
      ],
    })
    .sort({ createdAt: "desc" })
    .lean();

  const bestAnswers = answers.filter((answer) => answer.isBest);
  const practicalAnswers = answers.filter((answer) => answer.isPractical);

  return (
    <>
      {user.token ? <SetCookie token={user.token} /> : null}
      <UserPanel>
        <Main
          numberOfQuestions={questions.length}
          numberOfAnswers={answers.length}
          numberOfBestAnswers={bestAnswers.length}
          numberOfPracticalAnswers={practicalAnswers.length}
          questions={questions.slice(0, 3)}
          answers={answers.slice(0, 3)}
        />
      </UserPanel>
    </>
  );
}

export default page;
