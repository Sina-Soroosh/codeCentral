import React from "react";
import { Metadata } from "next";
import AdminPanel from "@/components/layout/AdminPanel/AdminPanel";
import Create from "@/components/templates/PanelAdmin/Tags/Create/Create";

export const metadata: Metadata = {
  title: "برچسب ها پنل مدیریت - مرکز کد",
};

function page() {
  return (
    <>
      <AdminPanel>
        <Create />
      </AdminPanel>
    </>
  );
}

export default page;
