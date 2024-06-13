import React from "react";
import styles from "./TagBox.module.css";
import Link from "next/link";

function TagBox() {
  return (
    <>
      <div className={styles.box}>
        <Link href="/tags/js">جاوااسکریپت</Link>
        <span>6 سوال</span>
      </div>
    </>
  );
}

export default TagBox;
