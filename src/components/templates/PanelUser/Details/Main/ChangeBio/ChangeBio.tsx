"use client";

import React, { useRef, useState } from "react";
import Loader from "@/components/modules/Loader/Loader";
import styles from "./../Main.module.css";
import showToast from "@/helpers/showToast";
import Swal from "sweetalert2";

type ChangeBioProps = {
  bio: string;
};

function ChangeBio({ bio }: ChangeBioProps) {
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const bioRef = useRef<null | HTMLTextAreaElement>(null);

  const changeBioHandler = async () => {
    const body = {
      bio: bioRef.current?.value || "",
    };

    if (!body.bio || body.bio.length === 0 || body.bio.length > 210) {
      showToast("بیوگرافی معتبر نیست");

      return;
    }

    setIsShowLoader(true);

    const res = await fetch("/api/users/bio", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 422:
        showToast("مقادیر ارسالی معتبر نیست");
        break;
      case 201:
        Swal.fire({
          title: "بیوگرافی شما به موفقیت تغییر کرد",
          confirmButtonText: "متوجه شدم",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });
        break;

      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");
        break;
    }
  };

  return (
    <>
      <div className={`${styles.box} col-lg-6`}>
        <div className={styles.title_box}>
          <h4>بیوگرافی کاربر</h4>
        </div>
        <p className={styles.text_box}>بیوگرافی - حداکثر ۲۱۰ کاراکتر</p>
        <div className={styles.input_box}>
          <textarea maxLength={210} defaultValue={bio} ref={bioRef}></textarea>
        </div>
        <button className={styles.submit_btn} onClick={changeBioHandler}>
          به روزرسانی بیوگرافی
        </button>
      </div>
      {isShowLoader ? <Loader /> : null}
    </>
  );
}

export default ChangeBio;
