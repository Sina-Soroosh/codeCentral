import React from "react";
import { Metadata } from "next";

type SearchProps = {
  searchParams: { q: string };
};

export function generateMetadata({ searchParams }: SearchProps): Metadata {
  return {
    title: `نتیجه جستجو : ${searchParams.q} - مرکز کد`,
  };
}

function page({ searchParams }: SearchProps) {
  return <></>;
}

export default page;
