import React from "react";
import styles from "./Main.module.css";

function Main() {
  return (
    <>
      <div className={styles.main}>
        <div className={`content ${styles.content}`}>
          <div className={styles.boxes}>
            <div className={styles.box}>
              <div className={styles.title}>
                <h3>{"{"} مرکز کد چیه؟</h3>
              </div>
              <p className={styles.text}>
                مرکز کد پرتالی جهت پرسش و پاسخ برنامه نویسان فارسی زبانه. هدف
                مرکز کد متمرکز روی پیشرفت و تعامل برنامه نویسان فارسی زبان با
                همدیگست {"}"}
              </p>
            </div>
            <div className={`${styles.line} ${styles.line_1}`}></div>
            <div className={`${styles.box} ${styles.left}`}>
              <div className={styles.title}>
                <h3>{"{"} پرسیدن سوال</h3>
              </div>
              <p className={styles.text}>
                توی مرکز کد در حد سی ثانیه طول میکشه تا ثبت نام کنی. بعد از اون
                میتونی هر سوالی که داری بپرسی. کاربرای سایت با جواب هاشون
                راهنماییت میکنن که توی سریعترین زمان ممکن مشکلت حل بشه.
                {"}"}
              </p>
            </div>
            <div className={`${styles.line} ${styles.line_2}`}></div>
            <div className={styles.box}>
              <div className={styles.title}>
                <h3>{"{"} جواب دادن به سوال های کاربرا</h3>
              </div>
              <p className={styles.text}>
                بعد از اینکه ثبت نام کردی میتونی هر سوالی که بلدی رو جواب بدی.
                اگه جوابت توسط همکارای مرکز کد به عنوان بهترین پاسخ انتخاب بشه و
                یا کاربری که سوال پرسیده جوابتو به عنوان پاسخ کاربردی انتخاب
                کنه، اعتبار(امتیاز) میگیری و بعد از رسیدن به سقف تعیین شده
                میتونی اعتبارتو تبدیل به پول نقد کنی تا علاوه بر پروسه ی
                یادگیری، درآمد هم داشته باشی! توضیحات بیشتر بعد از ثبت نام توی
                پنلت نوشته شده{"}"}
              </p>
            </div>
            <div className={`${styles.bg} ${styles.bg_1}`}></div>
            <div className={`${styles.bg} ${styles.bg_2}`}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
