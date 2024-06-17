import UserPanel from "@/components/layout/UserPanel/UserPanel";
import Main from "@/components/templates/PanelUser/Main/Main";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "پیشخوان - مرکز کد",
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
