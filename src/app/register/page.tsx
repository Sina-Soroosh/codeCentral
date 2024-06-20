import React from "react";
import { Metadata } from "next";
import Main from "@/components/templates/Register/Main/Main";
import { redirect } from "next/navigation";
import getUser from "@/helpers/getUserServer";

export const metadata: Metadata = {
  title: "ثبت نام - مرکز کد",
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
