import React from "react";
import AdminPanel from "@/components/layout/AdminPanel/AdminPanel";
import { connectToDB } from "@/configs/db";
import getUser from "@/helpers/getUserServer";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Create from "@/components/templates/PanelAdmin/Users/Create/Create";
import Main from "@/components/templates/PanelAdmin/Users/Main/Main";
import { User } from "@/types/Users.types";
import UserModel from "@/models/User";

export const metadata: Metadata = {
  title: " لیست کاربران پنل مدیریت - مرکز کد",
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

  const users: (User & { createdAt: Date })[] = await UserModel.find(
    {
      $nor: [{ _id: user.user._id }],
    },
    "username email role createdAt"
  )
    .sort({ createdAt: "desc" })
    .lean();

  return (
    <>
      <AdminPanel>
        <Create />
        <Main users={JSON.parse(JSON.stringify(users))} />
      </AdminPanel>
    </>
  );
}

export default page;
