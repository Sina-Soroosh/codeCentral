import React from "react";
import UserPanel from "@/components/layout/UserPanel/UserPanel";
import { Metadata } from "next";
import Main from "@/components/templates/PanelUser/Details/Main/Main";

export const metadata: Metadata = {
  title: "پروفایل - مرکز کد",
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
