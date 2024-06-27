import React from "react";
import AdminPanel from "@/components/layout/AdminPanel/AdminPanel";
import { connectToDB } from "@/configs/db";
import { Metadata } from "next";
import { Tag } from "@/types/Tags.types";
import TagModel from "@/models/Tag";
import QuestionModel from "@/models/Question";
import getUser from "@/helpers/getUserServer";
import { redirect } from "next/navigation";
import { ObjectId } from "mongoose";
import Main from "@/components/templates/PanelAdmin/Tags/Tag/Main/Main";

type TagProps = {
  params: { shortName: string };
};

type Question = {
  _id: ObjectId;
  title: string;
  shortName: string;
  answersCount: number;
  user: { _id: ObjectId; username: string };
  createdAt: Date;
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

  const questions: Question[] = await QuestionModel.find(
    { tags: tag._id },
    "title shortName answersCount user createdAt"
  )
    .populate({ path: "user", select: "username" })
    .sort({ createdAt: "desc" })
    .lean();

  return (
    <>
      <AdminPanel>
        <Main
          questions={JSON.parse(JSON.stringify(questions))}
          name={tag.title}
        />
      </AdminPanel>
    </>
  );
}

export default page;
