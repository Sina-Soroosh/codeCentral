import React from "react";
import styles from "./Main.module.css";
import Link from "next/link";
import AnswerBox from "@/components/modules/AnswerBox/AnswerBox";
import Answer from "../Answer/Answer";
import { Question } from "@/types/Question.types";
import { AnswerWithoutQuestion } from "@/types/Answer.types";
import { convertToSolarDate } from "@/helpers/date";

type MainProps = {
  question: Question;
  answers: AnswerWithoutQuestion[];
  isAdmin: boolean;
  isCreator: boolean;
};

function Main({ question, answers, isAdmin, isCreator }: MainProps) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.question}>
            <div className={styles.title}>
              <h3>
                <Link href={`/questions/${question.shortName}`}>
                  {question.title}
                </Link>
              </h3>
            </div>
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: question.body }}
            ></div>
            <div className={styles.tags}>
              {question.tags?.map((tag) => (
                <Link href={`/tags/${tag.shortName}`} className={styles.tag}>
                  {tag.title}
                </Link>
              ))}
            </div>
            <div className={styles.user}>
              <span>
                در تاریخ {convertToSolarDate(question.createdAt)} توسط{" "}
                <Link href={`/user/${question.user?.username}`}>
                  {question.user?.username}
                </Link>
              </span>
            </div>
          </div>
          <div className={styles.answers}>
            {answers.map((answer) => (
              <AnswerBox
                answer={answer}
                isAdmin={isAdmin}
                isCreator={isCreator}
                key={answer._id.toString()}
              />
            ))}
          </div>
          <Answer />
        </div>
      </div>
    </>
  );
}

export default Main;
