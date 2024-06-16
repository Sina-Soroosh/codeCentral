import React from "react";
import { Metadata } from "next";
import Main from "@/components/templates/Questions/Question/Main/Main";

export const metadata: Metadata = {
  title: "چرا پاسخ false است؟ - مرکز کد",
};

function page() {
  return (
    <>
      <Main />
    </>
  );
}

export default page;
