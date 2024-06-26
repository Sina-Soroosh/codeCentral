import React from "react";
import AdminPanel from "@/components/layout/AdminPanel/AdminPanel";
import getUser from "@/helpers/getUserServer";
import { redirect } from "next/navigation";
import { connectToDB } from "@/configs/db";
import { Metadata } from "next";
import UserModel from "@/models/User";
import { ObjectId } from "mongoose";
import QuestionModel from "@/models/Question";
import AnswerModel from "@/models/Answer";
import TagModel from "@/models/Tag";
import Main from "@/components/templates/PanelAdmin/Main/Main";

export const metadata: Metadata = {
  title: "پنل مدیریت - مرکز کد",
};

type User = {
  _id: ObjectId;
  username: string;
  answers: { _id: ObjectId }[];
  questions: { _id: ObjectId }[];
};

type Tag = {
  _id: ObjectId;
  title: string;
  shortName: string;
  questions: { _id: ObjectId }[];
};

async function page() {
  await connectToDB();

  const user = await getUser();

  if (user.isLogin === false) {
    redirect("/login");
  }

  if (user.isAdmin === false) {
    redirect("/p-user");
  }

  const users: User[] = await UserModel.find(
    { role: "USER" },
    "username answers questions"
  )
    .populate([
      { path: "answers", select: "_id" },
      { path: "questions", select: "_id" },
    ])
    .lean();

  const tags: Tag[] = await TagModel.find({}, "title shortName questions")
    .populate([{ path: "questions", select: "_id" }])
    .lean();

  const numberOfQuestions: number = await (await QuestionModel.find({})).length;

  const numberOfBestAnswers: number = await (
    await AnswerModel.find({ isBest: true })
  ).length;

  const numberOfPracticalAnswers: number = await (
    await AnswerModel.find({ isPractical: true })
  ).length;

  const mostPervasiveUsers = [...users]
    .sort(
      (first, second) =>
        second.answers.length +
        second.questions.length -
        (first.answers.length + first.questions.length)
    )
    .splice(0, 3);

  const usefulTags = tags
    .sort((first, second) => second.questions.length - first.questions.length)
    .splice(0, 3);

  return (
    <>
      <AdminPanel>
        <Main
          mostPervasiveUsers={mostPervasiveUsers}
          numberOfBestAnswers={numberOfBestAnswers}
          numberOfPracticalAnswers={numberOfPracticalAnswers}
          numberOfQuestions={numberOfQuestions}
          numberOfUsers={users.length}
          usefulTags={usefulTags}
        />
      </AdminPanel>
    </>
  );
}

export default page;
