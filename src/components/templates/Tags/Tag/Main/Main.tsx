import React from "react";
import styles from "./Main.module.css";
import Tab from "@/components/modules/Tab/Tab";
import { SearchParams as SearchParamsType } from "@/types/SearchParams.types";
import QuestionBox from "@/components/modules/QuestionBox/QuestionBox";
import Pagination from "@/components/modules/Pagination/Pagination";
import { QuestionWithoutBody } from "@/types/Question.types";

type MainProps = {
  searchParams: SearchParamsType;
  tag: string;
  questions: QuestionWithoutBody[];
  manyPage: number;
};

function Main({ searchParams, tag, questions, manyPage }: MainProps) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>
          <span className={styles.line}></span>
          <h2>سوالات جاوااسکریپت</h2>
        </div>
        <div className={styles.content}>
          <Tab
            activeTab={
              searchParams?.tab === "unanswered" ? "unanswered" : "newest"
            }
            path={`/tags/${tag}`}
            searchParams={searchParams}
            isUser={false}
          />
          {questions.length ? (
            <>
              <div className={styles.container}>
                {questions.map((question) => (
                  <QuestionBox key={question._id.toString()} {...question} />
                ))}
              </div>
              <Pagination
                activePage={isNaN(+searchParams?.page) ? 1 : +searchParams.page}
                manyPage={manyPage}
                path={`/tags/${tag}`}
                searchParams={searchParams}
              />
            </>
          ) : (
            <p className={styles.err}>سوالی برای نمایش وجود ندارد!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
