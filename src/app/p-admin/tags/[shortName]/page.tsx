import React from "react";
import AdminPanel from "@/components/layout/AdminPanel/AdminPanel";
import { connectToDB } from "@/configs/db";
import { Metadata } from "next";
import { Tag } from "@/types/Tags.types";
import TagModel from "@/models/Tag";
import getUser from "@/helpers/getUserServer";
import { redirect } from "next/navigation";

type TagProps = {
  params: { shortName: string };
};

export async function generateMetadata({
  params,
}: TagProps): Promise<Metadata> {
  await connectToDB();

  const tag: null | Tag = await TagModel.findOne({
    shortName: params.shortName,
  }).lean();

  if (!tag) {
    return {};
  }

  return {
    title: `سوالات ${tag.title} پنل مدیریت - مرکز کد`,
  };
}

async function page({ params }: TagProps) {
  await connectToDB();

  const user = await getUser();

  if (user.isLogin === false) {
    redirect("/login");
  }

  if (user.isAdmin === false) {
    redirect("/p-user");
  }

  const tag: null | Tag = await TagModel.findOne({
    shortName: params.shortName,
  }).lean();

  if (!tag) {
    redirect("/p-admin/tags");
  }

  return (
    <>
      <AdminPanel></AdminPanel>
    </>
  );
}

export default page;
