"use client";

import React from "react";
import styles from "./Tab.module.css";
import { SearchParams as SearchParamsType } from "@/types/SearchParams.types";
import { useRouter } from "next/navigation";

type EnumNormalTabs = "newest" | "unanswered";
type EnumUserTabs = "questions" | "answers";

type NormalTab = {
  activeTab: EnumNormalTabs;
  isUser: false;
};

type UserTab = {
  activeTab: EnumUserTabs;
  isUser: true;
};

type TabProps = (UserTab | NormalTab) & {
  path: `/${string}`;
  searchParams: SearchParamsType;
};

function Tab({ activeTab, path, searchParams, isUser }: TabProps) {
  const router = useRouter();

  const changeTab = (tab: EnumNormalTabs | EnumUserTabs) => {
    let searches = `tab=${tab}`;

    for (const key in searchParams) {
      if (key !== "tab") {
        searches += `&${key}=${searchParams[key]}`;
      }
    }

    router.push(`${path}?${searches}`);
  };

  return (
    <>
      <div className={styles.tab}>
        <div className={styles.content}>
          <div className={styles.buttons}>
            {isUser ? (
              <>
                <button
                  onClick={() => changeTab("questions")}
                  className={`${styles.btn} ${
                    activeTab === "questions" && styles.active
                  }`}
                >
                  سوالات
                </button>
                <button
                  onClick={() => changeTab("answers")}
                  className={`${styles.btn} ${
                    activeTab === "answers" && styles.active
                  }`}
                >
                  جواب ها
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => changeTab("newest")}
                  className={`${styles.btn} ${
                    activeTab === "newest" && styles.active
                  }`}
                >
                  جدیدترین سوالات
                </button>
                <button
                  onClick={() => changeTab("unanswered")}
                  className={`${styles.btn} ${
                    activeTab === "unanswered" && styles.active
                  }`}
                >
                  سوالات بدون پاسخ
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tab;
