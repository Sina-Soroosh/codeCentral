import React from "react";
import UserPanel from "@/components/layout/UserPanel/UserPanel";
import { Metadata } from "next";
import { SearchParams } from "@/types/SearchParams.types";
import Main from "@/components/templates/PanelUser/Activity/Main/Main";
import SetCookie from "@/components/modules/SetCookie/SetCookie";
import getUser from "@/helpers/getUserServer";
import { redirect } from "next/navigation";
import { Answer } from "@/types/Answer.types";
import { QuestionWithoutBody } from "@/types/Question.types";
import AnswerModel from "@/models/Answer";
import QuestionModel from "@/models/Question";

type ActivityProps = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: "سوال و جواب شما - مرکز کد",
};

async function page({ searchParams }: ActivityProps) {
  const user = await getUser();

  if (user.isLogin === false) {
    redirect("/login");
  }

  let allActivity: (Answer | QuestionWithoutBody)[] = [];

  if (searchParams.tab === "answers") {
    allActivity = await AnswerModel.find(
      { user: user.user._id },
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
      { user: user.user._id },
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
      {user.token ? <SetCookie token={user.token} /> : null}
      <UserPanel>
        <Main
          searchParams={searchParams}
          isAnswers={searchParams.tab === "answers"}
          activity={selectedActivity}
          manyPage={Math.ceil(allActivity.length / 5)}
        />
      </UserPanel>
    </>
  );
}

export default page;
