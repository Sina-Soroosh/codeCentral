import React from "react";
import styles from "./Main.module.css";
import { FaUser } from "react-icons/fa6";
import { SearchParams } from "@/types/SearchParams.types";
import Tab from "@/components/modules/Tab/Tab";
import QuestionBox from "@/components/modules/QuestionBox/QuestionBox";
import Pagination from "@/components/modules/Pagination/Pagination";
import { User } from "@/types/Users.types";
import { convertToSolarDate } from "@/helpers/date";
import { QuestionWithoutBody } from "@/types/Question.types";
import { Answer } from "@/types/Answer.types";

type MainProps = {
  searchParams: SearchParams;
  username: string;
  manyPage: number;
  user: User & { createdAt: Date; bio: string };
  isAnswers: boolean;
  activity: (Answer | QuestionWithoutBody)[];
};

function Main(props: MainProps) {
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
                <span>{props.user.username}</span>
                <span>
                  تاریخ عضویت :{convertToSolarDate(props.user.createdAt)}
                </span>
              </div>
            </div>
            <div className={`${styles.bio} col-md-6`}>
              <h5>بیوگرافی کاربر</h5>
              <p dangerouslySetInnerHTML={{ __html: props.user.bio }}></p>
            </div>
          </div>
          <div className={styles.activity}>
            <Tab
              activeTab={
                props.searchParams?.tab === "answers" ? "answers" : "questions"
              }
              path={`/user/${props.username}`}
              searchParams={props.searchParams}
              isUser
            />
            {props.activity.length ? (
              <>
                {props.isAnswers
                  ? props.activity.map((answer) => (
                      <QuestionBox
                        key={answer._id.toString()}
                        {...(answer as Answer).question}
                      />
                    ))
                  : props.activity.map((question) => (
                      <QuestionBox
                        key={question._id.toString()}
                        {...(question as QuestionWithoutBody)}
                      />
                    ))}
                <Pagination
                  activePage={
                    isNaN(+props.searchParams?.page)
                      ? 1
                      : +props.searchParams.page
                  }
                  manyPage={props.manyPage}
                  path={`/user/${props.user.username}`}
                  searchParams={props.searchParams}
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
