"use client";

import React, { useRef } from "react";
import styles from "./MenuForMobile.module.css";
import { IoSearch } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuForMobileProps {
  isActive: boolean;
  hideMenu: () => void;
}

function MenuForMobile({ isActive, hideMenu }: MenuForMobileProps) {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const router = useRouter();

  const searchHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (inputRef.current) {
      const keyWord: string = inputRef.current.value;

      if (keyWord.trim()) {
        router.push(`/search?q=${keyWord.trim()}`);

        inputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <div
        className={`${styles.cover_page} ${isActive ? styles.active : null}`}
        onClick={() => hideMenu()}
      ></div>
      <div className={`${styles.menu} ${isActive ? styles.active : null}`}>
        <div className={styles.content}>
          <div className={styles.close_btn} onClick={hideMenu}>
            <span>
              <FaXmark />
            </span>
          </div>
          <div className={styles.search}>
            <form onSubmit={searchHandler}>
              <input
                type="search"
                placeholder="جستجو بین سوالات ..."
                ref={inputRef}
              />
              <button className={styles.icon_btn}>
                <IoSearch />
              </button>
            </form>
          </div>
          <div className={styles.main}>
            <ul>
              <li>
                <Link href="/">صفحه اصلی</Link>
              </li>
              <li>
                <Link href="/questions">سوالات</Link>
              </li>
              <li>
                <Link href="/tags">برچسب ها</Link>
              </li>
              <li>
                <Link href="/rules">قوانین</Link>
              </li>
              <li>
                <Link href="/about">درباره مرکز کد</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuForMobile;
