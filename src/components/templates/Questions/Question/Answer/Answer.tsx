"use client";

import React, { useState } from "react";
import styles from "./Answer.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import Loader from "@/components/modules/Loader/Loader";
import showToast from "@/helpers/showToast";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const EditorText = dynamic(
  () => {
    return import("../../../../modules/EditorText/EditorText");
  },
  { ssr: false }
);

type AnswerProps = {
  isLogin: boolean;
  shortName: string;
};

function Answer({ isLogin, shortName }: AnswerProps) {
  const router = useRouter();
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const submitAnswer = async () => {
    if (text.length < 20) {
      showToast("پاسخ کوتاه است");

      return;
    }

    setIsShowLoader(true);

    const res = await fetch("/api/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: text,
        question: shortName,
      }),
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 201:
        await Swal.fire({
          title: "پاسخ با موفقیت ثبت شد",
          confirmButtonText: "متوجه شدم",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });

        setText("");
        router.refresh();
        break;

      case 422:
        showToast("پاسخ کوتاه است");

        break;
      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");

        break;
    }
  };

  return (
    <>
      <div className={styles.answer}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h5>ارسال پاسخ به سوال بالا</h5>
          </div>
          {isLogin ? (
            <div className={styles.send}>
              <p className={styles.details}>
                اگر پاسخت شامل تکه کدی میشه، از منوی ویرایشگر پایین، تکه کدی که
                نوشتی رو انتخاب کن و بعد از طریق
                <span></span>
                زبان کدی که نوشتی رو انتخاب کن تا کدت داخل بلاک مخصوص زبان خودش
                قرار بگیره و کدت خواناتر برای بقیه نشون داده بشه
              </p>
              <p className={styles.details}>
                اگه پاسخت رفرنسی داره، لینک رفرنس رو هم بذار تا پاسختت کاملتر و
                معتبر تر بشه
              </p>
              <EditorText value={text} onChange={setText} />
              <button className={styles.submit_btn} onClick={submitAnswer}>
                ارسال پاسخ
              </button>
            </div>
          ) : (
            <p className={styles.err}>
              برای ثبت پاسخ باید{" "}
              <Link href="/login">وارد حساب کاربری خود شوید.</Link>
            </p>
          )}
        </div>
      </div>
      {isShowLoader ? <Loader /> : null}
    </>
  );
}

export default Answer;
