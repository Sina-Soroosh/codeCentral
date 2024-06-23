"use client";

import React, { useRef, useState } from "react";
import styles from "./Main.module.css";
import dynamic from "next/dynamic";
import { Tag } from "@/types/Tags.types";
import showToast from "@/helpers/showToast";
import Loader from "@/components/modules/Loader/Loader";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

const EditorText = dynamic(
  () => {
    return import("../../../../modules/EditorText/EditorText");
  },
  { ssr: false }
);

type MainProps = {
  tags: Tag[];
};

type QuestionCreate = {
  title: string;
  body: string;
  tags: string[];
};

function Main({ tags }: MainProps) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const titleRef = useRef<null | HTMLInputElement>(null);
  const [body, setBody] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);

  const toggleSelectTag = (
    e: React.ChangeEvent<HTMLInputElement>,
    shortNameTag: string
  ) => {
    if (e.target.checked) {
      setSelectedTags((prevSelectedTags) => [
        ...prevSelectedTags,
        shortNameTag,
      ]);
    } else {
      setSelectedTags((prevSelectedTags) =>
        [...prevSelectedTags].filter((tag) => tag !== shortNameTag)
      );
    }
  };

  const createQuestion = async (question: QuestionCreate) => {
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });

    setIsShowLoader(false);

    switch (response.status) {
      case 422:
        showToast("اطلاعات معتبر نیست");
        break;
      case 201:
        await Swal.fire({
          title: "سوال با موفقیت اضافه شد",
          confirmButtonText: "متوجه شدم",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });

        mutate("GetMeHeader");
        router.replace("/p-user/activity");
        break;

      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");
        break;
    }
  };

  const submitQuestion = () => {
    const question: QuestionCreate = {
      body,
      tags: selectedTags,
      title: titleRef.current?.value || "",
    };

    if (!question.title || question.title.length < 10) {
      showToast("عنوان سوال باید حداقل 10 کارکتر باشد");

      return;
    }

    if (!question.body || question.body.length < 20) {
      showToast("سوال شما کوتاه هست");

      return;
    }

    if (!Array.isArray(question.tags) || question.tags.length === 0) {
      showToast("یک تگ را باید حداقل انتخاب کنید");

      return;
    }

    setIsShowLoader(true);

    createQuestion(question);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.title}>
            <span className={styles.line}></span>
            <h2>ایجاد سوال جدید</h2>
          </div>
          <div className={styles.container}>
            <div className={styles.box}>
              <div className={styles.title_box}>
                <h4>عنوان سوال</h4>
              </div>
              <p className={styles.text_box}>
                عنوان سوال باید حداقل ۱۰ و حداکثر ۱۲۰ کاراکتر و یک خلاصه ی واضح
                از سوالت باشه
              </p>
              <div className={styles.input_box}>
                <input
                  type="text"
                  ref={titleRef}
                  placeholder="مثال : چرا کد من به جه 2 به من 11 میدهد؟"
                  maxLength={210}
                  minLength={10}
                />
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.title_box}>
                <h4>سوال شما</h4>
              </div>
              <p className={styles.text_box}>
                حتما تکه کد خودت رو توی سوال قرار بده و انتظارت از اجرای اون و
                نتیجه ی اجرای اون را توضیح بده
              </p>
              <p className={styles.text_box}>
                حتما از منوی ویرایشگر پایین، تکه کدی که نوشتی رو انتخاب کن و بعد
                از طریق
                <span className={styles.code}></span>
                زبان کدی که نوشتی رو انتخاب کن تا کدت داخل بلاک مخصوص زبان خودش
                قرار بگیره و کدت خواناتر برای بقیه نشون داده بشه
              </p>
              <div className={styles.input_box}>
                <EditorText value={body} onChange={setBody} />
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.title_box}>
                <h4>تگ های سوال</h4>
              </div>
              <p className={styles.text_box}>
                تیک تگ هایی که به سوالات مربوط هست رو بزن تا افراد بیشتری سوالتو
                ببینن
              </p>
              <div className={"row"}>
                {tags.map((tag) => (
                  <div
                    key={tag._id.toString()}
                    className={`${styles.tag_box} col-6 col-sm-4 col-md-3 col-lg-2`}
                  >
                    <input
                      type="checkbox"
                      id={tag.shortName}
                      onChange={(e) => toggleSelectTag(e, tag.shortName)}
                    />
                    <label htmlFor={tag.shortName}>{tag.title}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.btn}>
              <button onClick={() => submitQuestion()}>ثبت سوال</button>
            </div>
          </div>
        </div>
      </div>
      {isShowLoader ? <Loader /> : null}
    </>
  );
}

export default Main;
