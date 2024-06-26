import React from "react";
import styles from "./InfoBox.module.css";

type InfoBoxProps = {
  title: string;
  icon: React.ReactNode;
  text: string;
  count: number;
};

function InfoBox({ count, icon, text, title }: InfoBoxProps) {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.detail}>
          <h6>{title}</h6>
          <span>
            {count} {text}
          </span>
        </div>
      </div>
    </>
  );
}

export default InfoBox;
