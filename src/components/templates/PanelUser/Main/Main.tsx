import React from "react";
import styles from "./Main.module.css";
import QuestionBox from "@/components/modules/QuestionBox/QuestionBox";
import InfoBox from "@/components/modules/UserPanel/InfoBox/InfoBox";
import { LuMailQuestion } from "react-icons/lu";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { SiAnswer } from "react-icons/si";

function Main() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.details}>
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <InfoBox
                  icon={<LuMailQuestion />}
                  count={3}
                  text="سوال"
                  title="سوالات شما"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <InfoBox
                  icon={<MdOutlineQuestionAnswer />}
                  count={2}
                  text="پاسخ"
                  title="پاسخ های شما"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <InfoBox
                  icon={<GrStatusGood />}
                  count={1}
                  text="پاسخ"
                  title="بهترین پاسخ"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <InfoBox
                  icon={<SiAnswer />}
                  count={1}
                  text="پاسخ"
                  title="پاسخ کاربردی"
                />
              </div>
            </div>
          </div>
          <div className={styles.activity}>
            <div className="row">
              <div className="col-lg-6">
                <div className={styles.questions}>
                  <div className={styles.title}>
                    <h5>3 سوال اخیر شما</h5>
                  </div>
                  <QuestionBox />
                  <QuestionBox />
                  <QuestionBox />
                  {/* <p className={styles.err}>سوالی یافت نشد</p> */}
                </div>
              </div>
              <div className="col-lg-6">
                <div className={styles.answers}>
                  <div className={styles.title}>
                    <h5>3 جواب اخیر شما</h5>
                  </div>
                  {/* <QuestionBox />
                  <QuestionBox />
                  <QuestionBox /> */}
                  <p className={styles.err}>جوابی یافت نشد</p>
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
