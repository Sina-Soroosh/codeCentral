"use client";

import React, { useState } from "react";
import styles from "./Answer.module.css";
import dynamic from "next/dynamic";

const EditorText = dynamic(
  () => {
    return import("../../../../modules/EditorText/EditorText");
  },
  { ssr: false }
);

function Answer() {
  const [text, setText] = useState<string>("");

  return (
    <>
      <div className={styles.answer}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h5>ارسال پاسخ به سوال بالا</h5>
          </div>
          <div className={styles.send}>
            <p className={styles.details}>
              اگر پاسخت شامل تکه کدی میشه، از منوی ویرایشگر پایین، تکه کدی که
              نوشتی رو انتخاب کن و بعد از طریق
              <span></span>
              زبان کدی که نوشتی رو انتخاب کن تا کدت داخل بلاک مخصوص زبان خودش
              قرار بگیره و کدت خواناتر برای بقیه نشون داده بشه
            </p>
            <p className={styles.details}>
              اگه پاسخت رفرنسی داره، لینک رفرنس رو هم بذار تا پاسختت کاملتر و
              معتبر تر بشه
            </p>
            <EditorText value={text} onChange={setText} />
            <button className={styles.submit_btn}>ارسال پاسخ</button>
          </div>
          {/* <p className={styles.err}>
            برای ثبت پاسخ باید{" "}
            <Link href="/login">وارد حساب کاربری خود شوید.</Link>
          </p> */}
        </div>
      </div>
    </>
  );
}

export default Answer;
