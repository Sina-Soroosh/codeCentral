import React from "react";
import styles from "./Main.module.css";
import { FaLock, FaUser } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineMail } from "react-icons/md";

function Main() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <form className={styles.form}>
            <div className={styles.title}>
              <h3>ثبت نام در مرکز کد</h3>
            </div>
            <div className={`${styles.input_box} ${styles.first}`}>
              <input type="text" placeholder="نام کاربری" />
              <span className={styles.icon}>
                <FaUser />
              </span>
            </div>
            <div className={`${styles.input_box}`}>
              <input type="email" placeholder="ایمیل" />
              <span className={styles.icon}>
                <MdOutlineMail />
              </span>
            </div>
            <div className={`${styles.input_box}`}>
              <input type="password" placeholder="رمز عبور" />
              <span className={styles.icon}>
                <FaLock />
              </span>
            </div>
            <div className={`${styles.input_box} ${styles.last}`}>
              <input type="password" placeholder="تکرار رمز عبور" />
              <span className={styles.icon}>
                <FaLock />
              </span>
            </div>
            <div className={styles.link}>
              <Link href="/login">حساب کاربری دارید؟</Link>
            </div>
            <div className={styles.btn}>
              <button>ثبت نام</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Main;
