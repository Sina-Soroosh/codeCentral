"use client";

import React from "react";
import styles from "./Tab.module.css";
import { SearchParams as SearchParamsType } from "@/types/SearchParams.types";
import { useRouter } from "next/navigation";

type EnumTabs = "newest" | "unanswered";

type TabProps = {
  activeTab: EnumTabs;
  path: `/${string}`;
  searchParams: SearchParamsType;
};

function Tab({ activeTab, path, searchParams }: TabProps) {
  const router = useRouter();

  const changeTab = (tab: EnumTabs) => {
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Tab;
