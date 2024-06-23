import React from "react";
import { Metadata } from "next";
import Main from "@/components/templates/Questions/Main/Main";
import { SearchParams as SearchParamsType } from "@/types/SearchParams.types";
import { QuestionWithoutBody } from "@/types/Question.types";
import QuestionModel from "@/models/Question";

export const metadata: Metadata = {
  title: "سوالات - مرکز کد",
};

type QuestionsProps = {
  searchParams: SearchParamsType;
};

async function page({ searchParams }: QuestionsProps) {
  const questions: QuestionWithoutBody[] = await QuestionModel.find(
    searchParams.tab === "unanswered"
      ? {
          answersCount: 0,
        }
      : {},
    "user title tags createdAt answersCount shortName"
  )
    .populate([
      { path: "user", select: "username" },
      { path: "tags", select: "shortName title" },
    ])
    .sort({ createdAt: "desc" });

  let activeQuestions: QuestionWithoutBody[] = [
    ...JSON.parse(JSON.stringify(questions)),
  ];

  let endIndex = (+searchParams.page || 1) * 5;
  let startIndex = endIndex - 5;

  activeQuestions = activeQuestions.slice(startIndex, endIndex);

  return (
    <>
      <Main
        searchParams={searchParams}
        questions={activeQuestions}
        manyPage={Math.ceil(questions.length / 5)}
      />
    </>
  );
}

export default page;
