import React from "react";
import styles from "./Main.module.css";
import QuestionBox from "@/components/modules/QuestionBox/QuestionBox";
import InfoBox from "@/components/modules/UserPanel/InfoBox/InfoBox";
import { LuMailQuestion } from "react-icons/lu";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { SiAnswer } from "react-icons/si";
import { QuestionWithoutBody } from "@/types/Question.types";
import { Answer } from "@/types/Answer.types";

type MainProps = {
  numberOfQuestions: number;
  numberOfAnswers: number;
  numberOfBestAnswers: number;
  numberOfPracticalAnswers: number;
  questions: QuestionWithoutBody[];
  answers: Answer[];
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
                  icon={<LuMailQuestion />}
                  count={props.numberOfQuestions}
                  text="سوال"
                  title="سوالات شما"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <InfoBox
                  icon={<MdOutlineQuestionAnswer />}
                  count={props.numberOfAnswers}
                  text="پاسخ"
                  title="پاسخ های شما"
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
                <div className={styles.questions}>
                  <div className={styles.title}>
                    <h5>3 سوال اخیر شما</h5>
                  </div>
                  {props.questions.length ? (
                    props.questions.map((question) => (
                      <QuestionBox
                        key={question._id.toString()}
                        {...question}
                      />
                    ))
                  ) : (
                    <p className={styles.err}>سوالی یافت نشد</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className={styles.answers}>
                  <div className={styles.title}>
                    <h5>3 جواب اخیر شما</h5>
                  </div>
                  {props.answers.length ? (
                    props.answers.map((answer) => (
                      <QuestionBox
                        key={answer._id.toString()}
                        {...answer.question}
                      />
                    ))
                  ) : (
                    <p className={styles.err}>جوابی یافت نشد</p>
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
