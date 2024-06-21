"use client";

import React, { PropsWithChildren, useState } from "react";
import styles from "./UserPanel.module.css";
import Link from "next/link";
import {
  TbArrowBigLeftLines,
  TbArrowBigRightLines,
  TbLogout2,
  TbPencilPlus,
  TbPencilQuestion,
  TbStack2,
  TbUser,
} from "react-icons/tb";
import { useRouter } from "next/navigation";
import showToast from "@/helpers/showToast";
import { useSWRConfig } from "swr";
import Loader from "@/components/modules/Loader/Loader";

function UserPanel({ children }: PropsWithChildren) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);

  const logoutHandler = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    setIsShowLoader(true);

    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    setIsShowLoader(false);

    if (res.status !== 200) {
      showToast("خطایی رخ داده");

      return;
    }

    mutate("GetMeHeader");
    router.replace("/login");
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${isShowMenu && styles.active}`}
        onClick={() => setIsShowMenu(false)}
      ></div>
      <div className={styles.layout}>
        <div className={styles.show_menu} onClick={() => setIsShowMenu(true)}>
          <TbArrowBigLeftLines />
        </div>
        <div className={`${styles.menu} ${isShowMenu && styles.active}`}>
          <div className={styles.close} onClick={() => setIsShowMenu(false)}>
            <TbArrowBigRightLines />
          </div>
          <ul>
            <li>
              <Link href="/p-user">
                <TbStack2 />
                پیشخوان
              </Link>
            </li>
            <li>
              <Link href="/p-user/new-question">
                <TbPencilPlus />
                ایجاد سوال جدید
              </Link>
            </li>
            <li>
              <Link href="/p-user/activity">
                <TbPencilQuestion />
                سوال و جواب
              </Link>
            </li>
            <li>
              <Link href="/p-user/details">
                <TbUser />
                اطلاعات کاربری
              </Link>
            </li>
            <li>
              <Link href="#" onClick={logoutHandler}>
                <TbLogout2 />
                خروج
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      {isShowLoader ? <Loader /> : null}
    </>
  );
}

export default UserPanel;
