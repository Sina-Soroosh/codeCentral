"use client";

import React, { useRef, useState } from "react";
import styles from "./Create.module.css";
import showToast from "@/helpers/showToast";
import { useRouter } from "next/navigation";
import Loader from "@/components/modules/Loader/Loader";
import Swal from "sweetalert2";

type Body = {
  title: string;
  shortName: string;
};

function Create() {
  const router = useRouter();
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const titleRef = useRef<null | HTMLInputElement>(null);
  const shortNameRef = useRef<null | HTMLInputElement>(null);

  const createTagHandler = async (body: Body) => {
    setIsShowLoader(true);

    const res = await fetch("/api/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 422:
        showToast("مقادیر ارسالی صحیح نیست");
        break;
      case 409:
        showToast("برچسبی با این نام کوتاه وجود دارد");
        break;
      case 201:
        Swal.fire({
          title: "برچسب با موفقیت اظافه شد",
          confirmButtonText: "متوجه شدم",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });

        (titleRef.current as HTMLInputElement).value = "";
        (shortNameRef.current as HTMLInputElement).value = "";

        router.refresh();
        break;

      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");
        break;
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: Body = {
      title: titleRef.current?.value || "",
      shortName: shortNameRef.current?.value || "",
    };

    if (!body.title || body.title.length < 3) {
      showToast("نام برچسب باید حداقل 3 کارکتر باشد");

      return;
    }

    if (!body.shortName || body.shortName.length < 3) {
      showToast("نام کوتاه برچسب باید حداقل 3 کارکتر باشد");

      return;
    }

    createTagHandler(body);
  };

  return (
    <>
      <div className={styles.create}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h4>افزودن برچسب</h4>
          </div>
          <form className="row" onSubmit={submitForm}>
            <div className={`col-md-6 ${styles.input_box}`}>
              <label htmlFor="title">نام برچسب</label>
              <input
                type="text"
                id="title"
                placeholder="نام برچسب را وارد کنید"
                ref={titleRef}
              />
            </div>
            <div className={`col-md-6 ${styles.input_box}`}>
              <label htmlFor="shortname">نام کوتاه برچسب</label>
              <input
                type="text"
                id="shortname"
                placeholder="نام کوتاه برچسب را وارد کنید"
                ref={shortNameRef}
              />
            </div>
            <div className="col-12">
              <button className={styles.submit_btn}>ثبت برچسب</button>
            </div>
          </form>
        </div>
      </div>
      {isShowLoader ? <Loader /> : <></>}
    </>
  );
}

export default Create;
