import React from "react";
import styles from "./Main.module.css";
import Tab from "@/components/modules/Tab/Tab";
import { SearchParams as SearchParamsType } from "@/types/SearchParams.types";
import QuestionBox from "@/components/modules/QuestionBox/QuestionBox";
import Pagination from "@/components/modules/Pagination/Pagination";

type MainProps = {
  searchParams: SearchParamsType;
};

function Main({ searchParams }: MainProps) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <Tab
            activeTab={
              searchParams?.tab === "unanswered" ? "unanswered" : "newest"
            }
            path="/questions"
            searchParams={searchParams}
            isUser={false}
          />
          <div className={styles.container}>
            <QuestionBox />
            <QuestionBox />
            <QuestionBox />
          </div>
          <Pagination
            activePage={isNaN(+searchParams?.page) ? 1 : +searchParams.page}
            manyPage={3}
            path="/questions"
            searchParams={searchParams}
          />
          {/* <p className={styles.err}>سوالی برای نمایش وجود ندارد!</p> */}
        </div>
      </div>
    </>
  );
}

export default Main;
