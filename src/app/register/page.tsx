import React from "react";
import { Metadata } from "next";
import Main from "@/components/templates/Register/Main/Main";

export const metadata: Metadata = {
  title: "ثبت نام - مرکز کد",
};

function page() {
  return (
    <>
      <Main />
    </>
  );
}

export default page;
