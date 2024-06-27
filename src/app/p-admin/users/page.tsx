import React from "react";
import AdminPanel from "@/components/layout/AdminPanel/AdminPanel";
import { connectToDB } from "@/configs/db";
import getUser from "@/helpers/getUserServer";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Create from "@/components/templates/PanelAdmin/Users/Create/Create";

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

  return (
    <>
      <AdminPanel>
        <Create />
      </AdminPanel>
    </>
  );
}

export default page;
