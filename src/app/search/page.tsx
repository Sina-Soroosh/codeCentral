import React from "react";
import { Metadata } from "next";
import Main from "@/components/templates/Search/Main/Main";
import { redirect } from "next/navigation";

type SearchProps = {
  searchParams: { q: string };
};

export function generateMetadata({ searchParams }: SearchProps): Metadata {
  return {
    title: `نتیجه جستجو : ${searchParams.q} - مرکز کد`,
  };
}

function page({ searchParams }: SearchProps) {
  if (!searchParams.q) {
    redirect("/404");
  }

  return (
    <>
      <Main searchParams={searchParams} />
    </>
  );
}

export default page;
