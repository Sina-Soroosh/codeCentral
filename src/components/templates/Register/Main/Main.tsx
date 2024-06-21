"use client";

import React, { useRef, useState } from "react";
import styles from "./Main.module.css";
import { FaLock, FaUser } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineMail } from "react-icons/md";
import Swal from "sweetalert2";
import patterns from "@/utils/patterns";
import Loader from "@/components/modules/Loader/Loader";
import { useRouter } from "next/navigation";
import showToast from "@/helpers/showToast";
import { useSWRConfig } from "swr";

type UserRegister = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

function Main() {
  const router = useRouter();
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const usernameRef = useRef<null | HTMLInputElement>(null);
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const repeatPasswordRef = useRef<null | HTMLInputElement>(null);
  const { mutate } = useSWRConfig();

  const registerHandler = async (user: UserRegister): Promise<void> => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    setIsShowLoader(false);

    switch (response.status) {
      case 403:
        showToast("این ایمیل مسدود شده است");
        break;
      case 409:
        showToast("کاربری با این ایمیل و نام کاربری وجود دارد");
        break;
      case 422:
        showToast("اطلاعات معتبر نیست");
        break;
      case 201:
        await Swal.fire({
          title: "ثبت نام با موفقیت انجام شد",
          confirmButtonText: "ورود به پنل کاربری",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });

        mutate("GetMeHeader");
        router.replace("/p-user");
        break;

      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");
        break;
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>): undefined => {
    e.preventDefault();

    const user: UserRegister = {
      username: usernameRef.current?.value.trim() || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      repeatPassword: repeatPasswordRef.current?.value || "",
    };

    if (!user.username || user.username.length < 3) {
      showToast("نام کاربری باید حداقل 3 کارکتر باشد");

      return;
    }

    if (!patterns.email.test(user.email as string)) {
      showToast("ایمیل صحیح نیست");

      return;
    }

    if (!patterns.password.test(user.password as string)) {
      showToast(
        "رمز عبور باید حداقل 8 کارکتر باشه و دارای یک حرف بزرگ و یک کارکتر خاص باشد"
      );

      return;
    }

    if (user.password !== user.repeatPassword) {
      showToast("تکرار رمز عبور با رمز عبور برابر نیست");

      return;
    }

    setIsShowLoader(true);
    registerHandler(user);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <form className={styles.form} onSubmit={submitForm}>
            <div className={styles.title}>
              <h3>ثبت نام در مرکز کد</h3>
            </div>
            <div className={`${styles.input_box} ${styles.first}`}>
              <input type="text" placeholder="نام کاربری" ref={usernameRef} />
              <span className={styles.icon}>
                <FaUser />
              </span>
            </div>
            <div className={`${styles.input_box}`}>
              <input type="email" placeholder="ایمیل" ref={emailRef} />
              <span className={styles.icon}>
                <MdOutlineMail />
              </span>
            </div>
            <div className={`${styles.input_box}`}>
              <input type="password" placeholder="رمز عبور" ref={passwordRef} />
              <span className={styles.icon}>
                <FaLock />
              </span>
            </div>
            <div className={`${styles.input_box} ${styles.last}`}>
              <input
                type="password"
                placeholder="تکرار رمز عبور"
                ref={repeatPasswordRef}
              />
              <span className={styles.icon}>
                <FaLock />
              </span>
            </div>
            <p className={styles.note}>
              رمز عبور باید حداقل 8 کارکتر باشه و دارای یک حرف بزرگ و یک کارکتر
              خاص باشد
            </p>
            <div className={styles.link}>
              <Link href="/login">حساب کاربری دارید؟</Link>
            </div>
            <div className={styles.btn}>
              <button>ثبت نام</button>
            </div>
          </form>
        </div>
      </div>
      {isShowLoader ? <Loader /> : null}
    </>
  );
}

export default Main;
