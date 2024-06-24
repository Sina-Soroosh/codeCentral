import React from "react";
import styles from "./Main.module.css";
import TagBox from "@/components/modules/TagBox/TagBox";
import { Tag } from "@/types/Tags.types";
import { SearchParams } from "@/types/SearchParams.types";

type MainProps = {
  tags: (Tag & { questions: { title: string }[] })[];
};

function Main({ tags }: MainProps) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>
          <span className={styles.line}></span>
          <h2>برچسب ها</h2>
        </div>
        <div className={styles.content}>
          <div className="row">
            {tags.map((tag) => (
              <div className="col-6 col-md-3" key={tag._id.toString()}>
                <TagBox {...tag} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
