import React from "react";
import Main from "@/components/templates/Login/Main/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری - مرکز کد",
};

function page() {
  return (
    <>
      <Main />
    </>
  );
}

export default page;
