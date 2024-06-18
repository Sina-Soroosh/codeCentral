import React from "react";
import UserPanel from "@/components/layout/UserPanel/UserPanel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پروفایل - مرکز کد",
};

function page() {
  return (
    <>
      <UserPanel></UserPanel>
    </>
  );
}

export default page;
