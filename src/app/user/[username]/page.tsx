import React from "react";
import { SearchParams } from "@/types/SearchParams.types";
import { Metadata } from "next";
import Main from "@/components/templates/User/Main/Main";

type UserProps = {
  searchParams: SearchParams;
  params: { username: string };
};

export function generateMetadata({ params }: UserProps): Metadata {
  return {
    title: `${params.username} - مرکز کد`,
  };
}

function page({ params, searchParams }: UserProps) {
  return (
    <>
      <Main searchParams={searchParams} username={params.username} />
    </>
  );
}

export default page;
