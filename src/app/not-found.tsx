import React from "react";
import { Metadata } from "next";
import Main from "@/components/templates/404/Main/Main";

export const metadata: Metadata = {
  title: "صفحه مورد نظر یافت نشد - مرکز کد",
};

function NotFound() {
  return (
    <>
      <Main />
    </>
  );
}

export default NotFound;
