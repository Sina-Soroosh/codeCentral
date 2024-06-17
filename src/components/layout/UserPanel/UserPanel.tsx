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

function UserPanel({ children }: PropsWithChildren) {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

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
              <Link href="#">
                <TbLogout2 />
                خروج
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}

export default UserPanel;
