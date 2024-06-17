import React from "react";
import styles from "./Main.module.css";
import { FaUser } from "react-icons/fa6";
import { SearchParams } from "@/types/SearchParams.types";
import Tab from "@/components/modules/Tab/Tab";
import QuestionBox from "@/components/modules/QuestionBox/QuestionBox";
import Pagination from "@/components/modules/Pagination/Pagination";

type MainProps = {
  searchParams: SearchParams;
  username: string;
};

function Main({ searchParams, username }: MainProps) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={`${styles.details} row`}>
            <div className={`${styles.infos} col-md-6`}>
              <div className={styles.avatar}>
                <FaUser />
              </div>
              <div className={styles.info}>
                <span>Sina-Soroosh</span>
                <span>تاریخ عضویت : 1403/03/20</span>
              </div>
            </div>
            <div className={`${styles.bio} col-md-6`}>
              <h5>بیوگرافی کاربر</h5>
              <p>
                برنامه نویس فرانت اند هستم و با ریکت کار می‌کنم. <br /> عاشق
                چالش‌های فرانت‌اند و برنامه نویسی هستم و دوست دارم کنار
                توسعه‌های پروژه دانش خود را ارتقا بدم.
              </p>
            </div>
          </div>
          <div className={styles.activity}>
            <Tab
              activeTab={
                searchParams?.tab === "answers" ? "answers" : "questions"
              }
              path={`/user/${username}`}
              searchParams={searchParams}
              isUser
            />
            <QuestionBox />
            <QuestionBox />
            <QuestionBox />
            <Pagination
              activePage={isNaN(+searchParams?.page) ? 1 : +searchParams.page}
              manyPage={3}
              path={`/user/${username}`}
              searchParams={searchParams}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
