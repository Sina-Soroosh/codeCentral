import React from "react";
import styles from "./Main.module.css";
import ChangeDetails from "./ChangeDetails/ChangeDetails";
import ChangeBio from "./ChangeBio/ChangeBio";
import ChangePassword from "./ChangePassword/ChangePassword";

type MainProps = {
  username: string;
  email: string;
  bio: string;
};

function Main({ username, email, bio }: MainProps) {
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
              <ChangeDetails username={username} email={email} />
              <ChangeBio bio={bio} />
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
