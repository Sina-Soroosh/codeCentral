import React from "react";
import styles from "./Main.module.css";

function Main() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>
          <span className={styles.line}></span>
          <h2>برچسب ها</h2>
        </div>
        <div className={styles.content}></div>
      </div>
    </>
  );
}

export default Main;
