import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import { FaLink, FaTelegram } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.content}>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className={styles.logo}>
                  <Link href="/">
                    <img src="/images/logo/logo.png" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-md-4">
                <div className={styles.links}>
                  <div className={styles.title}>
                    <h4>دسترسی سریع</h4>
                  </div>
                  <ul>
                    <li>
                      <Link href="/questions">
                        <FaLink />
                        سوالات
                      </Link>
                    </li>
                    <li>
                      <Link href="/tags">
                        <FaLink />
                        برچسب ها
                      </Link>
                    </li>
                    <li>
                      <Link href="/rules">
                        <FaLink />
                        قوانین
                      </Link>
                    </li>
                    <li>
                      <Link href="/about">
                        <FaLink />
                        درباره مرکز کد
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4">
                <div className={styles.links}>
                  <div className={styles.title}>
                    <h4>تماس با ما</h4>
                  </div>
                  <ul className={styles.contact}>
                    <li>
                      <a href="https://t.me/sinasoroosh" target="_blank">
                        <span>
                          <FaTelegram />
                          تلگرام :
                        </span>
                        <span>Sinasoroosh@</span>
                      </a>
                    </li>
                    <li>
                      <a href="tel:+989914317972">
                        <span>
                          <LuPhone />
                          تلفن :
                        </span>
                        <span>09914317972</span>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:sinasoroosh07@gmail.com">
                        <span>
                          <MdOutlineEmail />
                          ایمیل :
                        </span>
                        <span>sinasoroosh07@gmail.com</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.copy_right}>
          <p>
            تمامی حقوق مادی و معنوی این سایت متعلق به{" "}
            <Link href="/">مرکز کد</Link> میباشد.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
