import Main from "@/components/templates/Tags/Main/Main";
import { connectToDB } from "@/configs/db";
import TagModel from "@/models/Tag";
import { Tag } from "@/types/Tags.types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "برچسب ها - مرکز کد",
};

async function page() {
  await connectToDB();

  const tags: (Tag & { questions: { title: string }[] })[] =
    await TagModel.find()
      .populate({ path: "questions", select: "title" })
      .lean();

  return (
    <>
      <Main tags={tags} />
    </>
  );
}

export default page;
