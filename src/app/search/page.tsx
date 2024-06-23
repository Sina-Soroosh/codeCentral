import React from "react";
import { Metadata } from "next";
import Main from "@/components/templates/Search/Main/Main";
import { redirect } from "next/navigation";
import { QuestionWithoutBody } from "@/types/Question.types";
import QuestionModel from "@/models/Question";
import { SearchParams } from "@/types/SearchParams.types";

type SearchProps = {
  searchParams: SearchParams;
};

export function generateMetadata({ searchParams }: SearchProps): Metadata {
  return {
    title: `نتیجه جستجو : ${searchParams.q} - مرکز کد`,
  };
}

async function page({ searchParams }: SearchProps) {
  if (!searchParams.q) {
    redirect("/404");
  }

  const allQuestions: QuestionWithoutBody[] = await QuestionModel.find(
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

  const questions: QuestionWithoutBody[] = JSON.parse(
    JSON.stringify(allQuestions)
  ).filter((question: QuestionWithoutBody) =>
    question.title.toLowerCase().includes(searchParams.q.toLowerCase())
  );

  let activeQuestions: QuestionWithoutBody[] = [...questions];

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
