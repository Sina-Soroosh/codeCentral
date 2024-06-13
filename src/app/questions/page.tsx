import React from "react";
import { Metadata } from "next";
import Main from "@/components/templates/Questions/Main/Main";
import { SearchParams as SearchParamsType } from "@/types/SearchParams.types";

export const metadata: Metadata = {
  title: "سوالات - مرکز کد",
};

type QuestionsProps = {
  searchParams: SearchParamsType;
};

function page({ searchParams }: QuestionsProps) {
  return (
    <>
      <Main searchParams={searchParams} />
    </>
  );
}

export default page;
