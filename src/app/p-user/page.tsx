import UserPanel from "@/components/layout/UserPanel/UserPanel";
import SetCookie from "@/components/modules/SetCookie/SetCookie";
import Main from "@/components/templates/PanelUser/Main/Main";
import getUser from "@/helpers/getUserServer";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "پیشخوان - مرکز کد",
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
