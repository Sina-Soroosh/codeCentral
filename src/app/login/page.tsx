import React from "react";
import Main from "@/components/templates/Login/Main/Main";
import { Metadata } from "next";
import getUser from "@/helpers/getUserServer";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری - مرکز کد",
};

async function page() {
  const user = await getUser();

  if (user.isLogin !== false) {
    redirect("/p-user");
  }

  return (
    <>
      <Main />
    </>
  );
}

export default page;
