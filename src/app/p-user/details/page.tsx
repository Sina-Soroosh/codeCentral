import React from "react";
import UserPanel from "@/components/layout/UserPanel/UserPanel";
import { Metadata } from "next";
import Main from "@/components/templates/PanelUser/Details/Main/Main";
import getUser from "@/helpers/getUserServer";
import { redirect } from "next/navigation";
import SetCookie from "@/components/modules/SetCookie/SetCookie";

export const metadata: Metadata = {
  title: "پروفایل - مرکز کد",
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
