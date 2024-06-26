import React from "react";
import AdminPanel from "@/components/layout/AdminPanel/AdminPanel";
import getUser from "@/helpers/getUserServer";
import { connectToDB } from "@/configs/db";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " سوالات پنل مدیریت - مرکز کد",
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

  return (
    <>
      <AdminPanel></AdminPanel>
    </>
  );
}

export default page;
