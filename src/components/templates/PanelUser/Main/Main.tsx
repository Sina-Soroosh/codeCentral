import React from "react";
import styles from "./Main.module.css";
import QuestionBox from "@/components/modules/QuestionBox/QuestionBox";

function Main() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.details}>
            <div className="row">
              <div className="col-md-6 col-lg-3"></div>
              <div className="col-md-6 col-lg-3"></div>
              <div className="col-md-6 col-lg-3"></div>
              <div className="col-md-6 col-lg-3"></div>
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
