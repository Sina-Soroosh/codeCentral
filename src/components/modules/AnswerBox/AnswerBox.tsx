"use client";

import React, { useState } from "react";
import styles from "./AnswerBox.module.css";
import Link from "next/link";
import { AnswerWithoutQuestion } from "@/types/Answer.types";
import { convertToSolarDate } from "@/helpers/date";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";
import showToast from "@/helpers/showToast";

type AnswerBoxProps = {
  answer: AnswerWithoutQuestion;
  isAdmin: boolean;
  isCreator: boolean;
};

function AnswerBox(props: AnswerBoxProps) {
  const router = useRouter();
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);

  const registerAnswerAsTheBestAnswer = async () => {
    if (!props.isAdmin) {
      return;
    }

    setIsShowLoader(true);

    const res = await fetch(`/api/answers/${props.answer._id}/best`, {
      method: "POST",
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 200:
        await Swal.fire({
          title: "پاسخ به عنوان بهترین پاسخ ثبت شد",
          confirmButtonText: "متوجه شدم",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });

        router.refresh();
        break;

      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");

        break;
    }
  };

  const registerAnswerAsThePracticalAnswer = async () => {
    if (!props.isCreator) {
      return;
    }

    setIsShowLoader(true);

    const res = await fetch(`/api/answers/${props.answer._id}/practical`, {
      method: "POST",
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 200:
        await Swal.fire({
          title: "پاسخ به عنوان پاسخ کاربردی ثبت شد",
          confirmButtonText: "متوجه شدم",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });

        router.refresh();
        break;

      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");

        break;
    }
  };

  const removeAnswer = async () => {
    if (!props.isAdmin) {
      return;
    }

    setIsShowLoader(true);

    const res = await fetch(`/api/answers/${props.answer._id}`, {
      method: "DELETE",
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 200:
        await Swal.fire({
          title: "پاسخ بت موفقیت حذف شد",
          confirmButtonText: "متوجه شدم",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });

        router.refresh();
        break;

      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");

        break;
    }
  };

  const confirmation = (title: string, func: Function) => {
    Swal.fire({
      title,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "نه , پشیمان شدم",
      confirmButtonText: "بله",
      cancelButtonColor: "#1E5128",
      confirmButtonColor: "#636262",
      focusCancel: true,
    }).then((res) => {
      if (res.isConfirmed) {
        func();
      }
    });
  };

  return (
    <>
      <div className={styles.box}>
        <div className={styles.top}>
          <div className={styles.actions}>
            {props.isAdmin && !props.answer?.isBest ? (
              <button
                onClick={() =>
                  confirmation(
                    "ایا از ثبت پاسخ به عنوان بهترین پاسخ اطمینان دارید؟",
                    registerAnswerAsTheBestAnswer
                  )
                }
              >
                ثبت به عنوان بهترین پاسخ
              </button>
            ) : (
              <></>
            )}
            {props.isAdmin ? (
              <button
                onClick={() =>
                  confirmation("ایا از حذف پاسخ اطمینان دارید؟", removeAnswer)
                }
              >
                حذف پاسخ
              </button>
            ) : (
              <></>
            )}
            {props.isCreator && !props.answer?.isPractical ? (
              <button
                onClick={() =>
                  confirmation(
                    "ایا از ثبت پاسخ به عنوان پاسخ کاربردی اطمینان دارید؟",
                    registerAnswerAsThePracticalAnswer
                  )
                }
              >
                ثبت به عنوان پاسخ کاربردی
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.status}>
            {props.answer?.isBest ? <span>بهترین پاسخ</span> : <></>}
            {props.answer?.isPractical ? <span>پاسخ کاربردی</span> : <></>}
          </div>
        </div>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: props.answer?.body }}
        ></div>
        <div className={styles.user}>
          <span>
            در تاریخ {convertToSolarDate(props.answer?.createdAt)} توسط{" "}
            <Link href={`/user/${props.answer?.user?.username}`}>
              {props.answer?.user?.username}
            </Link>
          </span>
        </div>
      </div>
      {isShowLoader ? <Loader /> : null}
    </>
  );
}

export default AnswerBox;
