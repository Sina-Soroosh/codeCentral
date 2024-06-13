"use client";

import React from "react";
import styles from "./Pagination.module.css";
import { SearchParams as SearchParamsType } from "@/types/SearchParams.types";
import { useRouter } from "next/navigation";

type PaginationProps = {
  activePage: number;
  manyPage: number;
  path: `/${string}`;
  searchParams: SearchParamsType;
};

function Pagination(props: PaginationProps) {
  const router = useRouter();

  const changePage = (page: number) => {
    let searches = `page=${page}`;

    for (const key in props.searchParams) {
      if (key !== "page") {
        searches += `&${key}=${props.searchParams[key]}`;
      }
    }

    router.push(`${props.path}?${searches}`);
  };

  return (
    <>
      <ul className={styles.pagination}>
        {Array(props.manyPage)
          .fill(0)
          .map((item, index) => (
            <li
              className={`${styles.page} ${
                index + 1 === props.activePage && styles.active
              }`}
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </li>
          ))}
      </ul>
    </>
  );
}

export default Pagination;
