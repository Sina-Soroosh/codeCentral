import React from "react";
import AdminPanel from "@/components/layout/AdminPanel/AdminPanel";
import { connectToDB } from "@/configs/db";
import getUser from "@/helpers/getUserServer";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Main from "@/components/templates/PanelAdmin/Bans/Main";
import BanModel from "@/models/Ban";
import { ObjectId } from "mongoose";

export const metadata: Metadata = {
  title: " لیست کاربران مسدود شده پنل مدیریت - مرکز کد",
};

type BlockedUsers = {
  email: string;
  createdAt: Date;
  _id: ObjectId;
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

  const users: BlockedUsers[] = await BanModel.find({}, "email createdAt")
    .sort({ createdAt: "desc" })
    .lean();

  return (
    <>
      <AdminPanel>
        <Main users={JSON.parse(JSON.stringify(users))} />
      </AdminPanel>
    </>
  );
}

export default page;
