import React from "react";
import { SearchParams } from "@/types/SearchParams.types";
import { Metadata } from "next";

type UserProps = {
  searchParams: SearchParams;
  params: { username: string };
};

export function generateMetadata({ params }: UserProps): Metadata {
  return {
    title: `${params.username} - مرکز کد`,
  };
}

function page() {
  return <></>;
}

export default page;
