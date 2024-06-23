import Main from "@/components/templates/Tags/Tag/Main/Main";
import { Metadata } from "next";
import React from "react";
import { SearchParams as SearchParamsType } from "@/types/SearchParams.types";
import { Tag } from "@/types/Tags.types";
import QuestionModel from "@/models/Question";
import TagModel from "@/models/Tag";
import { redirect } from "next/navigation";
import { QuestionWithoutBody } from "@/types/Question.types";

export const metadata: Metadata = {
  title: "سوالات جاوااسکریپت - مرکز کد",
};

type TagProps = {
  searchParams: SearchParamsType;
  params: { tag: string };
};

async function page({ searchParams, params }: TagProps) {
  const tag: null | Tag = await TagModel.findOne({
    shortName: params.tag,
  }).lean();

  if (!tag) {
    redirect("/404");
  }

  const questions: QuestionWithoutBody[] = await QuestionModel.find(
    searchParams.tab === "unanswered"
      ? {
          answersCount: 0,
          tags: tag._id,
        }
      : {
          tags: tag._id,
        },
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
        tag={params.tag}
        questions={activeQuestions}
        manyPage={Math.ceil(questions.length / 5)}
      />
    </>
  );
}

export default page;
