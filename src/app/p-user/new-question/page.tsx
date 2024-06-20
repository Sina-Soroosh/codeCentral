import React from "react";
import { Metadata } from "next";
import UserPanel from "@/components/layout/UserPanel/UserPanel";
import Main from "@/components/templates/PanelUser/NewQuestion/Main/Main";
import { redirect } from "next/navigation";
import getUser from "@/helpers/getUserServer";
import SetCookie from "@/components/modules/SetCookie/SetCookie";

export const metadata: Metadata = {
  title: "ایجاد سوال جدید - مرکز کد",
};

async function page() {
  const user = await getUser();

  if (user.isLogin === false) {
    redirect("/login");
  }

  return (
    <>
      {user.token ? <SetCookie token={user.token} /> : null}
      <UserPanel>
        <Main />
      </UserPanel>
    </>
  );
}

export default page;
