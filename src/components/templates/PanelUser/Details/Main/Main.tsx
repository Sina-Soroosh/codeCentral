import React from "react";
import styles from "./Main.module.css";

function Main() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.profile}>
            <div className={styles.title}>
              <span className={styles.line}></span>
              <h2>پروفایل کاربری</h2>
            </div>
            <div className={`row ${styles.boxes}`}>
              <div className={`${styles.box} col-lg-6`}>
                <div className={styles.title_box}>
                  <h4>مشخصات کاربری</h4>
                </div>
                <div className={styles.input_box}>
                  <label htmlFor="username">نام کاربری</label>
                  <input type="text" id="username" placeholder="نام کاربری" />
                </div>
                <div className={styles.input_box}>
                  <label htmlFor="email">آدرس ایمیل</label>
                  <input type="email" placeholder="آدرس ایمیل" id="email" />
                </div>
                <button className={styles.submit_btn}>
                  به روزرسانی اطلاعات
                </button>
              </div>
              <div className={`${styles.box} col-lg-6`}>
                <div className={styles.title_box}>
                  <h4>بیوگرافی کاربر</h4>
                </div>
                <p className={styles.text_box}>بیوگرافی - حداکثر ۲۱۰ کاراکتر</p>
                <div className={styles.input_box}>
                  <textarea maxLength={210}></textarea>
                </div>
                <button className={styles.submit_btn}>
                  به روزرسانی بیوگرافی
                </button>
              </div>
              <div className={`${styles.box} col-lg-6`}>
                <div className={styles.title_box}>
                  <h4>تغییر رمز عبور</h4>
                </div>
                <div className={styles.input_box}>
                  <label htmlFor="password">رمز عبور فعلی</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="نام کاربری"
                  />
                </div>
                <div className={styles.input_box}>
                  <label htmlFor="newPassword">رمز عبور جدید</label>
                  <input
                    type="password"
                    placeholder="رمز عبور جدید"
                    id="newPassword"
                  />
                </div>
                <div className={styles.input_box}>
                  <label htmlFor="repeatPassword"> تکرار رمز عبور جدید</label>
                  <input
                    type="password"
                    placeholder=" تکرار رمز عبور جدید"
                    id="repeatPassword"
                  />
                </div>
                <button className={styles.submit_btn}>تغییر رمز عبور</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
