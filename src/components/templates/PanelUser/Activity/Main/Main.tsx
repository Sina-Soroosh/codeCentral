import React from "react";
import styles from "./Main.module.css";
import Tab from "@/components/modules/Tab/Tab";
import QuestionBox from "@/components/modules/QuestionBox/QuestionBox";
import Pagination from "@/components/modules/Pagination/Pagination";
import { SearchParams } from "@/types/SearchParams.types";
import { Answer } from "@/types/Answer.types";
import { QuestionWithoutBody } from "@/types/Question.types";

type MainProps = {
  searchParams: SearchParams;
  isAnswers: boolean;
  activity: (Answer | QuestionWithoutBody)[];
  manyPage: number;
};

function Main({ searchParams, isAnswers, activity, manyPage }: MainProps) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>
          <span className={styles.line}></span>
          <h2>سوال ها و پاسخ های شما</h2>
        </div>
        <div className={styles.content}>
          <div className={styles.activity}>
            <Tab
              activeTab={
                searchParams?.tab === "answers" ? "answers" : "questions"
              }
              path={`/p-user/activity`}
              searchParams={searchParams}
              isUser
            />
            {activity.length ? (
              <>
                {isAnswers
                  ? activity.map((answer) => (
                      <QuestionBox
                        key={answer._id.toString()}
                        {...(answer as Answer).question}
                      />
                    ))
                  : activity.map((question) => (
                      <QuestionBox
                        key={question._id.toString()}
                        {...(question as QuestionWithoutBody)}
                      />
                    ))}
                <Pagination
                  activePage={
                    isNaN(+searchParams?.page) ? 1 : +searchParams.page
                  }
                  manyPage={manyPage}
                  path={`/p-user/activity`}
                  searchParams={searchParams}
                />
              </>
            ) : (
              <p className={styles.err}>موردی یافت نشد !</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
