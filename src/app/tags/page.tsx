// app/tags/page.tsx
import Main from "@/components/templates/Tags/Main/Main";
import { connectToDB } from "@/configs/db";
import TagModel from "@/models/Tag";
import { Tag } from "@/types/Tags.types";
import { Metadata } from "next";
import { SearchParams } from "@/types/SearchParams.types";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "برچسب ها - مرکز کد",
};

type TagsProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: TagsProps) {
  await connectToDB();

  const tags: (Tag & { questions: { title: string }[] })[] =
    await TagModel.find()
      .populate({ path: "questions", select: "title" })
      .lean();

  if (searchParams.ads === randomUUID()) {
    redirect("/404");
  }

  return <Main tags={tags} />;
}
