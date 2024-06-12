import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import { IoLogOut, IoSearch } from "react-icons/io5";
import { FaArrowLeftLong, FaUser } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={`content ${styles.content_header}`}>
          <div className={styles.top_header}>
            <div className={styles.logo}>
              <Link href="/">
                <img src="/images/logo/logo.png" alt="" />
              </Link>
            </div>
            <div className={styles.search}>
              <form>
                <input type="search" placeholder="جستجو بین سوالات ..." />
                <button className={styles.icon_btn}>
                  <IoSearch />
                </button>
              </form>
            </div>
            <div className={styles.account}>
              {/* <div className={styles.auth}>
                <Link href="/login" className={styles.login}>
                  وارد شوید
                </Link>
                <Link href="/register" className={styles.register}>
                  عضو شوید
                </Link>
              </div> */}
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
                      <Link href="#">
                        <IoLogOut />
                        خروج
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
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
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
