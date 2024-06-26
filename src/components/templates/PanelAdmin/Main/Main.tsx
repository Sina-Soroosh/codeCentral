import React from "react";
import styles from "./Main.module.css";
import { ObjectId } from "mongoose";
import InfoBox from "@/components/modules/InfoBox/InfoBox";
import { FaUsers } from "react-icons/fa6";
import { LuMailQuestion } from "react-icons/lu";
import { GrStatusGood } from "react-icons/gr";
import { SiAnswer } from "react-icons/si";
import Link from "next/link";

type User = {
  _id: ObjectId;
  username: string;
  answers: { _id: ObjectId }[];
  questions: { _id: ObjectId }[];
};

type Tag = {
  _id: ObjectId;
  title: string;
  shortName: string;
  questions: { _id: ObjectId }[];
};

type MainProps = {
  numberOfQuestions: number;
  numberOfBestAnswers: number;
  numberOfPracticalAnswers: number;
  numberOfUsers: number;
  mostPervasiveUsers: User[];
  usefulTags: Tag[];
};

function Main(props: MainProps) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.details}>
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <InfoBox
                  icon={<FaUsers />}
                  count={props.numberOfUsers}
                  text="کاربر"
                  title="کاربران عادی"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <InfoBox
                  icon={<LuMailQuestion />}
                  count={props.numberOfQuestions}
                  text="سوال"
                  title="سوالات"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <InfoBox
                  icon={<GrStatusGood />}
                  count={props.numberOfBestAnswers}
                  text="پاسخ"
                  title="بهترین پاسخ"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <InfoBox
                  icon={<SiAnswer />}
                  count={props.numberOfPracticalAnswers}
                  text="پاسخ"
                  title="پاسخ کاربردی"
                />
              </div>
            </div>
          </div>
          <div className={styles.activity}>
            <div className="row">
              <div className="col-lg-6">
                <div className={styles.users}>
                  <div className={styles.title}>
                    <h5>3 کاربر پرفعالیت</h5>
                  </div>
                  {props.mostPervasiveUsers?.length ? (
                    props.mostPervasiveUsers?.map((user) => (
                      <div className={styles.box}>
                        <div className={styles.question}>
                          {user.questions?.length} سوال
                        </div>
                        <div className={styles.answer}>
                          {user.answers?.length} جواب
                        </div>
                        <div className={styles.username}>
                          <Link href={`/user/${user.username}`}>
                            {user.username}
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={styles.err}>کاربری یافت نشد</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className={styles.tags}>
                  <div className={styles.title}>
                    <h5>3 برچسب پر استفاده</h5>
                  </div>
                  {props.usefulTags.length ? (
                    props.usefulTags.map((tag) => (
                      <div className={styles.box}>
                        <div className={styles.question}>
                          {tag.questions?.length} سوال
                        </div>
                        <div className={styles.username}>
                          <Link href={`/p-admin/tags/${tag.shortName}`}>
                            {tag.title}
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={styles.err}>برچسبی یافت نشد</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
