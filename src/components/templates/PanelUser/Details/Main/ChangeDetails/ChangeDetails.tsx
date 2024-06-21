"use client";

import React, { useRef, useState } from "react";
import showToast from "@/helpers/showToast";
import patterns from "@/utils/patterns";
import Loader from "@/components/modules/Loader/Loader";
import styles from "./../Main.module.css";
import Swal from "sweetalert2";

type ChangeDetailsProps = {
  username: string;
  email: string;
};

function ChangeDetails({ username, email }: ChangeDetailsProps) {
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const usernameRef = useRef<null | HTMLInputElement>(null);
  const emailRef = useRef<null | HTMLInputElement>(null);

  const changeDetailsHandler = async (newDetails: {
    username: string;
    email: string;
  }) => {
    const res = await fetch("/api/users/details", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDetails),
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 422:
        showToast("مقادیر ارسالی معتبر نیست");
        break;
      case 409:
        showToast("کاربری با این ایمیل یا نام کاربری وجود دارد");
        break;
      case 403:
        showToast("این ایمیل مسدود شده است");
        break;
      case 201:
        Swal.fire({
          title: "اطلاعات شما به موفقیت تغییر کرد",
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

  const submitChangeDetails = () => {
    const newDetails = {
      username: usernameRef.current?.value.trim() || "",
      email: emailRef.current?.value.trim() || "",
    };

    if (!newDetails.username || newDetails.username.length < 3) {
      showToast("نام کاربری باید حداقل 3 کارکتر باشد");
      return;
    }

    if (!patterns.email.test(newDetails.email)) {
      showToast("ایمیل معتبر نیست");
      return;
    }

    setIsShowLoader(true);

    changeDetailsHandler(newDetails);
  };

  return (
    <>
      <div className={`${styles.box} col-lg-6`}>
        <div className={styles.title_box}>
          <h4>مشخصات کاربری</h4>
        </div>
        <div className={styles.input_box}>
          <label htmlFor="username">نام کاربری</label>
          <input
            type="text"
            id="username"
            placeholder="نام کاربری"
            defaultValue={username}
            ref={usernameRef}
          />
        </div>
        <div className={styles.input_box}>
          <label htmlFor="email">آدرس ایمیل</label>
          <input
            type="email"
            placeholder="آدرس ایمیل"
            id="email"
            defaultValue={email}
            ref={emailRef}
          />
        </div>
        <button className={styles.submit_btn} onClick={submitChangeDetails}>
          به روزرسانی اطلاعات
        </button>
      </div>
      {isShowLoader ? <Loader /> : null}
    </>
  );
}

export default ChangeDetails;
