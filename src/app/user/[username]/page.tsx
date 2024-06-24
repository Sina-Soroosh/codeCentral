import React from "react";
import { SearchParams } from "@/types/SearchParams.types";
import { Metadata } from "next";
import Main from "@/components/templates/User/Main/Main";
import { User } from "@/types/Users.types";
import UserModel from "@/models/User";
import { redirect } from "next/navigation";
import { QuestionWithoutBody } from "@/types/Question.types";
import { Answer } from "@/types/Answer.types";
import AnswerModel from "@/models/Answer";
import QuestionModel from "@/models/Question";

type UserProps = {
  searchParams: SearchParams;
  params: { username: string };
};

export function generateMetadata({ params }: UserProps): Metadata {
  return {
    title: `${params.username} - مرکز کد`,
  };
}

async function page({ params, searchParams }: UserProps) {
  const user: null | (User & { createdAt: Date; bio: string }) =
    await UserModel.findOne({
      username: params.username,
    }).lean();

  if (!user) {
    return redirect("/404");
  }

  let allActivity: (Answer | QuestionWithoutBody)[] = [];

  if (searchParams.tab === "answers") {
    allActivity = await AnswerModel.find(
      { user: user._id },
      "_id createdAt question"
    )
      .populate({
        path: "question",
        select: "user title tags createdAt answersCount shortName",
        populate: [
          { path: "user", select: "username" },
          { path: "tags", select: "shortName title" },
        ],
      })
      .sort({ createdAt: "desc" });
  } else {
    allActivity = await QuestionModel.find(
      { user: user._id },
      "user title tags createdAt answersCount shortName"
    )
      .populate([
        { path: "user", select: "username" },
        { path: "tags", select: "shortName title" },
      ])
      .sort({ createdAt: "desc" });
  }

  let selectedActivity: (Answer | QuestionWithoutBody)[] = [
    ...JSON.parse(JSON.stringify(allActivity)),
  ];

  let endIndex = (+searchParams.page || 1) * 5;
  let startIndex = endIndex - 5;

  selectedActivity = selectedActivity.slice(startIndex, endIndex);

  return (
    <>
      <Main
        searchParams={searchParams}
        username={params.username}
        user={user}
        isAnswers={searchParams.tab === "answers"}
        activity={selectedActivity}
        manyPage={Math.ceil(allActivity.length / 5)}
      />
    </>
  );
}

export default page;
