import React from "react";
import styles from "./Main.module.css";
import Link from "next/link";

function Main() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <img src="/images/404.png" alt="" />
          <h5>صفحه ی مورد نظر پیدا نشد!</h5>
          <Link href="/">بازگشت به صفحه اصلی</Link>
        </div>
      </div>
    </>
  );
}

export default Main;
