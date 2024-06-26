import React from "react";
import AdminPanel from "@/components/layout/AdminPanel/AdminPanel";
import getUser from "@/helpers/getUserServer";
import { connectToDB } from "@/configs/db";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { ObjectId } from "mongoose";
import QuestionModel from "@/models/Question";
import Main from "@/components/templates/PanelAdmin/Questions/Main/Main";

export const metadata: Metadata = {
  title: " سوالات پنل مدیریت - مرکز کد",
};

type Question = {
  _id: ObjectId;
  title: string;
  shortName: string;
  answersCount: number;
  user: { _id: ObjectId; username: string };
  createdAt: Date;
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

  const questions: Question[] = await QuestionModel.find(
    {},
    "title shortName answersCount user createdAt"
  )
    .populate({ path: "user", select: "username" })
    .sort({ createdAt: "desc" })
    .lean();

  // console.log(questions);

  return (
    <>
      <AdminPanel>
        <Main questions={JSON.parse(JSON.stringify(questions))} />
      </AdminPanel>
    </>
  );
}

export default page;
