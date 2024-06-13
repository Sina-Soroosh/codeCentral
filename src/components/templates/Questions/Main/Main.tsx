import React from "react";
import styles from "./Main.module.css";
import Tab from "@/components/modules/Tab/Tab";
import { SearchParams as SearchParamsType } from "@/types/SearchParams.types";
import QuestionBox from "@/components/modules/QuestionBox/QuestionBox";

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
          />
          <div className={styles.container}>
            <QuestionBox />
            <QuestionBox />
            <QuestionBox />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
