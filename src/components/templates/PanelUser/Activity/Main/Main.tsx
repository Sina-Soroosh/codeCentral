import React from "react";
import styles from "./Main.module.css";
import Tab from "@/components/modules/Tab/Tab";
import QuestionBox from "@/components/modules/QuestionBox/QuestionBox";
import Pagination from "@/components/modules/Pagination/Pagination";
import { SearchParams } from "@/types/SearchParams.types";

type MainProps = {
  searchParams: SearchParams;
};

function Main({ searchParams }: MainProps) {
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
            <QuestionBox />
            <QuestionBox />
            <QuestionBox />
            <Pagination
              activePage={isNaN(+searchParams?.page) ? 1 : +searchParams.page}
              manyPage={3}
              path={`/p-user/activity`}
              searchParams={searchParams}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
