import React from "react";
import styles from "./AnswerBox.module.css";
import Link from "next/link";

function AnswerBox() {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.top}>
          <div className={styles.actions}>
            <button>ثبت به عنوان بهترین پاسخ</button>
            <button>ثبت به عنوان پاسخ کاربردی</button>
          </div>
          <div className={styles.status}>
            <span>بهترین پاسخ</span>
            <span>پاسخ کاربردی</span>
          </div>
        </div>
        <div className={styles.body}>
          <p>
            از اونجایی که x و y به دو آرایه ی مجزا تو حافظه اشاره می کنه، حتی
            اگر مقادیر اونها یکسان باشه و فرقی نداشته باشه ، از نظر نوع با هم
            برابر نیستن.
          </p>
          <p>فک کنم به این صورت هستش.</p>
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

export default AnswerBox;
