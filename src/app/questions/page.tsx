import React from "react";
import { Metadata } from "next";
import Main from "@/components/templates/Questions/Main/Main";

export const metadata: Metadata = {
  title: "سوالات - مرکز کد",
};

function page() {
  return (
    <>
      <Main />
    </>
  );
}

export default page;
