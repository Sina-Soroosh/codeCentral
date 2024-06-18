"use client";

import React, { useState } from "react";
import styles from "./Main.module.css";
import dynamic from "next/dynamic";

const EditorText = dynamic(
  () => {
    return import("../../../../modules/EditorText/EditorText");
  },
  { ssr: false }
);

function Main() {
  const [body, setBody] = useState<string>("");

  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.title}>
            <span className={styles.line}></span>
            <h2>ایجاد سوال جدید</h2>
          </div>
          <div className={styles.container}>
            <div className={styles.box}>
              <div className={styles.title_box}>
                <h4>عنوان سوال</h4>
              </div>
              <p className={styles.text_box}>
                عنوان سوال باید حداقل ۵ و حداکثر ۱۲۰ کاراکتر و یک خلاصه ی واضح
                از سوالت باشه
              </p>
              <div className={styles.input_box}>
                <input
                  type="text"
                  placeholder="مثال : چرا کد من به جه 2 به من 11 میدهد؟"
                />
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.title_box}>
                <h4>سوال شما</h4>
              </div>
              <p className={styles.text_box}>
                حتما تکه کد خودت رو توی سوال قرار بده و انتظارت از اجرای اون و
                نتیجه ی اجرای اون را توضیح بده
              </p>
              <p className={styles.text_box}>
                حتما از منوی ویرایشگر پایین، تکه کدی که نوشتی رو انتخاب کن و بعد
                از طریق
                <span className={styles.code}></span>
                زبان کدی که نوشتی رو انتخاب کن تا کدت داخل بلاک مخصوص زبان خودش
                قرار بگیره و کدت خواناتر برای بقیه نشون داده بشه
              </p>
              <div className={styles.input_box}>
                <EditorText value={body} onChange={setBody} />
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.title_box}>
                <h4>تگ های سوال</h4>
              </div>
              <p className={styles.text_box}>
                تیک تگ هایی که به سوالات مربوط هست رو بزن تا افراد بیشتری سوالتو
                ببینن
              </p>
              <div className={"row"}>
                <div
                  className={`${styles.tag_box} col-6 col-sm-4 col-md-3 col-lg-2`}
                >
                  <input type="checkbox" />
                  <label htmlFor="">JavaScript</label>
                </div>
                <div
                  className={`${styles.tag_box} col-6 col-sm-4 col-md-3 col-lg-2`}
                >
                  <input type="checkbox" />
                  <label htmlFor="">React</label>
                </div>
                <div
                  className={`${styles.tag_box} col-6 col-sm-4 col-md-3 col-lg-2`}
                >
                  <input type="checkbox" />
                  <label htmlFor="">NextJs</label>
                </div>
                <div
                  className={`${styles.tag_box} col-6 col-sm-4 col-md-3 col-lg-2`}
                >
                  <input type="checkbox" />
                  <label htmlFor="">HTML</label>
                </div>
                <div
                  className={`${styles.tag_box} col-6 col-sm-4 col-md-3 col-lg-2`}
                >
                  <input type="checkbox" />
                  <label htmlFor="">CSS</label>
                </div>
                <div
                  className={`${styles.tag_box} col-6 col-sm-4 col-md-3 col-lg-2`}
                >
                  <input type="checkbox" />
                  <label htmlFor="">TypeScript</label>
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
