import React from "react";
import { Metadata } from "next";
import UserPanel from "@/components/layout/UserPanel/UserPanel";

export const metadata: Metadata = {
  title: "ایجاد سوال جدید - مرکز کد",
};

function page() {
  return (
    <>
      <UserPanel></UserPanel>
    </>
  );
}

export default page;
