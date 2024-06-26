"use client";

import React, { useRef, useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import { IoLogOut, IoSearch } from "react-icons/io5";
import { FaUser, FaUserPlus } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosLogIn, IoMdMenu } from "react-icons/io";
import MenuForMobile from "../MenuForMobile/MenuForMobile";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Auth } from "@/types/Auth.types";
import getUser from "@/helpers/getUserClient";
import Loader from "../Loader/Loader";
import showToast from "@/helpers/showToast";

const fetcher = async (): Promise<Auth> => {
  return await getUser();
};

function Header() {
  const { data, mutate } = useSWR<Auth>("GetMeHeader", fetcher);
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
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

  const hideMenu = (): void => {
    setIsShowMenu(false);
  };

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

    mutate();
    router.push("/login");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={`content ${styles.content_header}`}>
          <div className={styles.top_header}>
            <div
              className={styles.menu_icon}
              onClick={() => setIsShowMenu(true)}
            >
              <span>
                <IoMdMenu />
              </span>
            </div>
            <div className={styles.logo}>
              <Link href="/">
                <img src="/images/logo/logo.png" alt="" />
              </Link>
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
            <div className={styles.account}>
              {data?.isLogin ? (
                <div className={styles.user}>
                  <div className={styles.logo}>
                    <span className={styles.icon}>
                      <FaUser />
                    </span>
                  </div>
                  <div className={styles.menu}>
                    <ul>
                      <li>
                        <Link href="/p-user">
                          <AiOutlineDashboard />
                          پیشخوان
                        </Link>
                      </li>
                      <li>
                        <Link href="/p-user/details">
                          <FaUser />
                          ویرایش پروفایل
                        </Link>
                      </li>
                      <li>
                        <Link href="#" onClick={logoutHandler}>
                          <IoLogOut />
                          خروج
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className={styles.auth}>
                  <Link href="/login" className={styles.login}>
                    <IoIosLogIn />
                    <span>وارد شوید</span>
                  </Link>
                  <Link href="/register" className={styles.register}>
                    <FaUserPlus />
                    <span>عضو شوید</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className={styles.bottom_header}>
            <div className={styles.menu}>
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
                {data?.isLogin && data.isAdmin ? (
                  <li>
                    <Link href="/p-admin">پنل مدیریت</Link>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
      <MenuForMobile
        isActive={isShowMenu}
        hideMenu={hideMenu}
        isAdmin={data?.isLogin ? data.isAdmin : false}
      />
      {isShowLoader ? <Loader /> : null}
    </>
  );
}

export default Header;
