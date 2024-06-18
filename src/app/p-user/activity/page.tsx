import React from "react";
import UserPanel from "@/components/layout/UserPanel/UserPanel";
import { Metadata } from "next";
import { SearchParams } from "@/types/SearchParams.types";
import Main from "@/components/templates/PanelUser/Activity/Main/Main";

type ActivityProps = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: "سوال و جواب شما - مرکز کد",
};

function page({ searchParams }: ActivityProps) {
  return (
    <>
      <UserPanel>
        <Main searchParams={searchParams} />
      </UserPanel>
    </>
  );
}

export default page;
