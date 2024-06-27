import React from "react";
import { Metadata } from "next";
import AdminPanel from "@/components/layout/AdminPanel/AdminPanel";

export const metadata: Metadata = {
  title: "برچسب ها پنل مدیریت - مرکز کد",
};

function page() {
  return (
    <>
      <AdminPanel></AdminPanel>
    </>
  );
}

export default page;
