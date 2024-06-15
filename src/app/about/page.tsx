import React from "react";
import { Metadata } from "next";
import Main from "@/components/templates/About/Main/Main";

export const metadata: Metadata = {
  title: "درباره مرکز کد - مرکز کد",
};

function page() {
  return (
    <>
      <Main />
    </>
  );
}

export default page;
