import React from "react";
import UserPanel from "@/components/layout/UserPanel/UserPanel";
import { Metadata } from "next";
import { SearchParams } from "@/types/SearchParams.types";
import Main from "@/components/templates/PanelUser/Activity/Main/Main";
import SetCookie from "@/components/modules/SetCookie/SetCookie";
import getUser from "@/helpers/getUserServer";
import { redirect } from "next/navigation";

type ActivityProps = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: "سوال و جواب شما - مرکز کد",
};

async function page({ searchParams }: ActivityProps) {
  const user = await getUser();

  if (user.isLogin === false) {
    redirect("/login");
  }

  return (
    <>
      {user.token ? <SetCookie token={user.token} /> : null}
      <UserPanel>
        <Main searchParams={searchParams} />
      </UserPanel>
    </>
  );
}

export default page;
