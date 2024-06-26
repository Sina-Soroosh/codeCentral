"use client";

import React, { PropsWithChildren, useState } from "react";
import styles from "./AdminPanel.module.css";
import Link from "next/link";
import {
  TbArrowBigLeftLines,
  TbArrowBigRightLines,
  TbBan,
  TbLogout2,
  TbMessageCircleQuestion,
  TbStack2,
  TbTags,
  TbUsers,
} from "react-icons/tb";
import { useRouter } from "next/navigation";
import showToast from "@/helpers/showToast";
import { useSWRConfig } from "swr";
import Loader from "@/components/modules/Loader/Loader";

function AdminPanel({ children }: PropsWithChildren) {
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
              <Link href="/p-admin">
                <TbStack2 />
                پیشخوان
              </Link>
            </li>
            <li>
              <Link href="/p-admin/questions">
                <TbMessageCircleQuestion />
                سوالات
              </Link>
            </li>
            <li>
              <Link href="/p-admin/tags">
                <TbTags />
                برچسب ها
              </Link>
            </li>
            <li>
              <Link href="/p-admin/users">
                <TbUsers />
                کاربران
              </Link>
            </li>
            <li>
              <Link href="/p-admin/bans">
                <TbBan />
                مسدود شده کاربران
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

export default AdminPanel;
