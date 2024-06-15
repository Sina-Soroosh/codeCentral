import React from "react";
import { Metadata } from "next";
import Main from "@/components/templates/Rules/Main/Main";

export const metadata: Metadata = {
  title: "قوانین - مرکز کد",
};

function page() {
  return (
    <>
      <Main />
    </>
  );
}

export default page;
