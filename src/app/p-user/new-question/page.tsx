import React from "react";
import { Metadata } from "next";
import UserPanel from "@/components/layout/UserPanel/UserPanel";
import Main from "@/components/templates/PanelUser/NewQuestion/Main/Main";

export const metadata: Metadata = {
  title: "ایجاد سوال جدید - مرکز کد",
};

function page() {
  return (
    <>
      <UserPanel>
        <Main />
      </UserPanel>
    </>
  );
}

export default page;
