import React from "react";
import styles from "./TagBox.module.css";
import Link from "next/link";
import { Tag } from "@/types/Tags.types";

type TagBoxProps = Tag & { questions: { title: string }[] };

function TagBox(props: TagBoxProps) {
  return (
    <>
      <div className={styles.box}>
        <Link href={`/tags/${props.shortName}`}>{props.title}</Link>
        <span>{props.questions?.length || 0} سوال</span>
      </div>
    </>
  );
}

export default TagBox;
