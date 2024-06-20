"use client";

import React, { useRef, useState } from "react";
import styles from "./Main.module.css";
import { FaLock, FaUser } from "react-icons/fa6";
import Link from "next/link";
import Swal from "sweetalert2";
import Loader from "@/components/modules/Loader/Loader";
import { useRouter } from "next/navigation";

function Main() {
  const router = useRouter();
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const identifierRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);

  const showToast = (title: string): void => {
    Swal.fire({
      title,
      position: "top",
      toast: true,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "#360404",
      color: "#fff",
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      identifier: identifierRef.current?.value,
      password: passwordRef.current?.value,
    };

    setIsShowLoader(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    setIsShowLoader(false);

    switch (response.status) {
      case 404:
        showToast("همچین کاربری وجود ندارد");
        break;
      case 200:
        await Swal.fire({
          title: "خوش آمدید",
          confirmButtonText: "ورود به پنل کاربری",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });

        router.replace("/p-user");
        break;

      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");
        break;
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <form className={styles.form} onClick={loginHandler}>
            <div className={styles.title}>
              <h3>ورود به مرکز کد</h3>
            </div>
            <div className={`${styles.input_box} ${styles.first}`}>
              <input
                type="text"
                placeholder="نام کاربری یا ایمیل"
                ref={identifierRef}
              />
              <span className={styles.icon}>
                <FaUser />
              </span>
            </div>
            <div className={`${styles.input_box} ${styles.last}`}>
              <input type="password" placeholder="رمز عبور" ref={passwordRef} />
              <span className={styles.icon}>
                <FaLock />
              </span>
            </div>
            <div className={styles.link}>
              <Link href="/register">حساب کاربری ندارید؟</Link>
            </div>
            <div className={styles.btn}>
              <button>ورود</button>
            </div>
          </form>
        </div>
      </div>
      {isShowLoader ? <Loader /> : null}
    </>
  );
}

export default Main;
