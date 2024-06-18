import React from "react";
import UserPanel from "@/components/layout/UserPanel/UserPanel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سوال و جواب شما - مرکز کد",
};

function page() {
  return (
    <>
      <UserPanel></UserPanel>
    </>
  );
}

export default page;
