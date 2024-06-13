import React from "react";
import styles from "./Main.module.css";
import TagBox from "@/components/modules/TagBox/TagBox";

function Main() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>
          <span className={styles.line}></span>
          <h2>برچسب ها</h2>
        </div>
        <div className={styles.content}>
          <div className="row">
            <div className="col-6 col-md-3">
              <TagBox />
            </div>
            <div className="col-6 col-md-3">
              <TagBox />
            </div>
            <div className="col-6 col-md-3">
              <TagBox />
            </div>
            <div className="col-6 col-md-3">
              <TagBox />
            </div>
            <div className="col-6 col-md-3">
              <TagBox />
            </div>
            <div className="col-6 col-md-3">
              <TagBox />
            </div>
            <div className="col-6 col-md-3">
              <TagBox />
            </div>
            <div className="col-6 col-md-3">
              <TagBox />
            </div>
            <div className="col-6 col-md-3">
              <TagBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
