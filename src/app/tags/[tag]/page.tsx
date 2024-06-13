import Main from "@/components/templates/Tags/Tag/Main/Main";
import { Metadata } from "next";
import React from "react";
import { SearchParams as SearchParamsType } from "@/types/SearchParams.types";

export const metadata: Metadata = {
  title: "سوالات جاوااسکریپت - مرکز کد",
};

type TagProps = {
  searchParams: SearchParamsType;
  params: { tag: string };
};

function page({ searchParams, params }: TagProps) {
  return (
    <>
      <Main searchParams={searchParams} tag={params.tag} />
    </>
  );
}

export default page;
