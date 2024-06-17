import UserPanel from "@/components/layout/UserPanel/UserPanel";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "پیشخوان - مرکز کد",
};

function page() {
  return (
    <>
      <UserPanel></UserPanel>
    </>
  );
}

export default page;
