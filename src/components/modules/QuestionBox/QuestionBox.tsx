import React from "react";
import styles from "./QuestionBox.module.css";
import Link from "next/link";

function QuestionBox() {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.title}>
          <h3>
            <Link href="/questions/کاربرد-هوک">کاربرد هوک ها</Link>
          </h3>
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
    </>
  );
}

export default QuestionBox;
