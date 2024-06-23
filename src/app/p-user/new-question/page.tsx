import React from "react";
import { Metadata } from "next";
import UserPanel from "@/components/layout/UserPanel/UserPanel";
import Main from "@/components/templates/PanelUser/NewQuestion/Main/Main";
import { redirect } from "next/navigation";
import getUser from "@/helpers/getUserServer";
import SetCookie from "@/components/modules/SetCookie/SetCookie";
import TagModel from "@/models/Tag";
import { Tag } from "@/types/Tags.types";
import { connectToDB } from "@/configs/db";

export const metadata: Metadata = {
  title: "ایجاد سوال جدید - مرکز کد",
};

async function page() {
  await connectToDB();

  const user = await getUser();

  if (user.isLogin === false) {
    redirect("/login");
  }

  const tags: Tag[] = await TagModel.find({}, "shortName title");

  return (
    <>
      {user.token ? <SetCookie token={user.token} /> : null}
      <UserPanel>
        <Main tags={tags} />
      </UserPanel>
    </>
  );
}

export default page;
