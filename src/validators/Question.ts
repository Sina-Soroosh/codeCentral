import patterns from "@/utils/patterns";
import { TbAssetFilled } from "react-icons/tb";

type Question = {
  title: string;
  body: string;
  tags: string[];
};

const check = (question: Question): boolean => {
  if (!question.title || question.title.length < 10) {
    return false;
  }

  if (!question.body || question.body.length < 20) {
    return false;
  }

  let isValidTags: boolean = true;

  question.tags.some((tag) => {
    if (typeof tag !== "string") {
      isValidTags = false;

      return true;
    }
  });

  return isValidTags;
};

export default check;
