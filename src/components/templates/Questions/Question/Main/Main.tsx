import React from "react";
import styles from "./Main.module.css";
import Link from "next/link";
import AnswerBox from "@/components/modules/AnswerBox/AnswerBox";
import Answer from "../Answer/Answer";

function Main() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.question}>
            <div className={styles.title}>
              <h3>
                <Link href="/questions/کاربرد-هوک">چرا پاسخ false است؟</Link>
              </h3>
            </div>
            <div className={styles.body}>
              <pre>
                let x = [1,2,3]
                <br />
                let y =[1,2,3]
                <br />
                <br />
                console.log(x===y)
              </pre>
            </div>
            <div className={styles.tags}>
              <Link href="/tags/react" className={styles.tag}>
                react
              </Link>
              <Link href="/tags/js" className={styles.tag}>
                js
              </Link>
            </div>
            <div className={styles.user}>
              <span>
                در تاریخ 1402/03/22 توسط <Link href="/user/test">test</Link>
              </span>
            </div>
          </div>
          <div className={styles.answers}>
            <AnswerBox />
            <AnswerBox />
            <AnswerBox />
          </div>
          <Answer />
        </div>
      </div>
    </>
  );
}

export default Main;
