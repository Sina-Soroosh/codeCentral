"use client";

import React, { useRef, useState } from "react";
import styles from "./Create.module.css";
import Loader from "@/components/modules/Loader/Loader";
import { useRouter } from "next/navigation";
import showToast from "@/helpers/showToast";
import patterns from "@/utils/patterns";
import Swal from "sweetalert2";

type AddUser = {
  username: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
};

function Create() {
  const router = useRouter();
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const usernameRef = useRef<null | HTMLInputElement>(null);
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const roleRef = useRef<null | HTMLSelectElement>(null);

  const addUserHandler = async (user: AddUser) => {
    setIsShowLoader(true);

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 422:
        showToast("مقادیر ارسالی صحیح نیست");
        break;
      case 409:
        showToast("کاربری با این نام کاربری یا ایمیل وجود دارد");
        break;
      case 201:
        Swal.fire({
          title: "کاربر با موفقیت اظافه شد",
          confirmButtonText: "متوجه شدم",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });

        (usernameRef.current as HTMLInputElement).value = "";
        (emailRef.current as HTMLInputElement).value = "";
        (passwordRef.current as HTMLInputElement).value = "";
        (roleRef.current as HTMLSelectElement).value = "USER";

        router.refresh();
        break;

      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");
        break;
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: AddUser = {
      username: usernameRef.current?.value.trim() || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      role: roleRef.current?.value === "ADMIN" ? "ADMIN" : "USER",
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

    addUserHandler(user);
  };

  return (
    <>
      <div className={styles.create}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h4>افزودن کاربر</h4>
          </div>
          <form className="row" onSubmit={submitForm}>
            <div className={`col-md-6 ${styles.input_box}`}>
              <label htmlFor="username">نام کاربری</label>
              <input
                type="text"
                id="username"
                placeholder="نام کاربری را وارد کنید"
                ref={usernameRef}
              />
            </div>
            <div className={`col-md-6 ${styles.input_box}`}>
              <label htmlFor="email">ایمیل</label>
              <input
                type="email"
                id="email"
                placeholder="ایمیل را وارد کنید"
                ref={emailRef}
              />
            </div>
            <div className={`col-md-6 ${styles.input_box}`}>
              <label htmlFor="password">رمز عبور</label>
              <input
                type="password"
                id="password"
                placeholder="ایمیل را وارد کنید"
                ref={passwordRef}
              />
            </div>
            <div className={`col-md-6 ${styles.input_box}`}>
              <label htmlFor="role">نقش</label>
              <select id="role" defaultValue="USER" ref={roleRef}>
                <option value="USER">کاربر عادی</option>
                <option value="ADMIN">مدیر</option>
              </select>
            </div>
            <div className="col-12">
              <button className={styles.submit_btn}>افزودن کاربر</button>
            </div>
          </form>
        </div>
      </div>
      {isShowLoader ? <Loader /> : <></>}
    </>
  );
}

export default Create;
