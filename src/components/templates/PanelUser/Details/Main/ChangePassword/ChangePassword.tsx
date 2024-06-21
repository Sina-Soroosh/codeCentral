"use client";

import React, { useRef, useState } from "react";
import Loader from "@/components/modules/Loader/Loader";
import styles from "./../Main.module.css";
import showToast from "@/helpers/showToast";
import Swal from "sweetalert2";
import patterns from "@/utils/patterns";

type ChangePasswordBody = {
  password: string;
  newPassword: string;
  repeatPassword: string;
};

function ChangePassword() {
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const newPasswordRef = useRef<null | HTMLInputElement>(null);
  const repeatPasswordRef = useRef<null | HTMLInputElement>(null);

  const changePasswordHandler = async (body: ChangePasswordBody) => {
    const res = await fetch("/api/users/password", {
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
      case 403:
        showToast("رمز عبور فعلی درست نیست");
        break;
      case 201:
        Swal.fire({
          title: "رمزعبور شما به موفقیت تغییر کرد",
          confirmButtonText: "متوجه شدم",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });

        (passwordRef.current as HTMLInputElement).value = "";
        (newPasswordRef.current as HTMLInputElement).value = "";
        (repeatPasswordRef.current as HTMLInputElement).value = "";
        break;

      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");
        break;
    }
  };

  const changePasswordSubmit = () => {
    const body: ChangePasswordBody = {
      password: passwordRef.current?.value || "",
      newPassword: newPasswordRef.current?.value || "",
      repeatPassword: repeatPasswordRef.current?.value || "",
    };

    if (!patterns.password.test(body.password)) {
      showToast(
        "رمز عبور باید حداقل 8 کارکتر باشه و دارای یک حرف بزرگ و یک کارکتر خاص باشد"
      );

      return;
    }

    if (!patterns.password.test(body.newPassword)) {
      showToast(
        "رمز عبور جدید باید حداقل 8 کارکتر باشه و دارای یک حرف بزرگ و یک کارکتر خاص باشد"
      );

      return;
    }

    if (body.newPassword !== body.repeatPassword) {
      showToast("تکرار رمز عبور با رمز عبور برابر نیست");

      return;
    }

    setIsShowLoader(true);

    changePasswordHandler(body);
  };

  return (
    <>
      <div className={`${styles.box} col-lg-6`}>
        <div className={styles.title_box}>
          <h4>تغییر رمز عبور</h4>
        </div>
        <div className={styles.input_box}>
          <label htmlFor="password">رمز عبور فعلی</label>
          <input
            type="password"
            id="password"
            placeholder="رمز عبور"
            ref={passwordRef}
          />
        </div>
        <div className={styles.input_box}>
          <label htmlFor="newPassword">رمز عبور جدید</label>
          <input
            type="password"
            placeholder="رمز عبور جدید"
            id="newPassword"
            ref={newPasswordRef}
          />
        </div>
        <div className={styles.input_box}>
          <label htmlFor="repeatPassword"> تکرار رمز عبور جدید</label>
          <input
            type="password"
            placeholder=" تکرار رمز عبور جدید"
            id="repeatPassword"
            ref={repeatPasswordRef}
          />
        </div>
        <button className={styles.submit_btn} onClick={changePasswordSubmit}>
          تغییر رمز عبور
        </button>
      </div>
      {isShowLoader ? <Loader /> : null}
    </>
  );
}

export default ChangePassword;
