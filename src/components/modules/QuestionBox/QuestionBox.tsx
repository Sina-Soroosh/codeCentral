import React from "react";
import styles from "./QuestionBox.module.css";
import Link from "next/link";
import { QuestionWithoutBody } from "@/types/Question.types";

function QuestionBox(props: QuestionWithoutBody) {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.title}>
          <h3>
            <Link href={`/questions/${props.shortName}`}>{props.title}</Link>
          </h3>
        </div>
        <div className={styles.tags}>
          {props.tags?.map((tag) => (
            <Link href={`/tags/${tag.shortName}`} className={styles.tag}>
              {tag.title}
            </Link>
          ))}
        </div>
        <div className={styles.user}>
          <span>
            در تاریخ 1402/03/22 توسط{" "}
            <Link href={`/user/${props.user?.username}`}>
              {props.user?.username}
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default QuestionBox;
