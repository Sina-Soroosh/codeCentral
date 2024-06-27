import React from "react";
import { Metadata } from "next";
import AdminPanel from "@/components/layout/AdminPanel/AdminPanel";
import Create from "@/components/templates/PanelAdmin/Tags/Create/Create";
import Main from "@/components/templates/PanelAdmin/Tags/Main/Main";
import { redirect } from "next/navigation";
import getUser from "@/helpers/getUserServer";
import { connectToDB } from "@/configs/db";
import TagModel from "@/models/Tag";
import { Tag } from "@/types/Tags.types";

export const metadata: Metadata = {
  title: "برچسب ها پنل مدیریت - مرکز کد",
};

async function page() {
  await connectToDB();

  const user = await getUser();

  if (user.isLogin === false) {
    redirect("/login");
  }

  if (user.isAdmin === false) {
    redirect("/p-user");
  }

  const tags: Tag[] = await TagModel.find({}, "title shortName")
    .sort({ createdAt: "desc" })
    .lean();

  return (
    <>
      <AdminPanel>
        <Create />
        <Main tags={JSON.parse(JSON.stringify(tags))} />
      </AdminPanel>
    </>
  );
}

export default page;
