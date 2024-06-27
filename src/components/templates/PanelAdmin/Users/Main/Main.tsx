"use client";

import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { useRouter } from "next/navigation";
import TableDetails from "@/components/modules/TableDetails/TableDetails";
import { TableCell, TableRow } from "@mui/material";
import { User } from "@/types/Users.types";
import Loader from "@/components/modules/Loader/Loader";
import { convertToSolarDate } from "@/helpers/date";
import Swal from "sweetalert2";
import showToast from "@/helpers/showToast";

type MainProps = { users: (User & { createdAt: Date })[] };

const columns = [
  { id: 1, label: "نام کاربری" },
  { id: 2, label: "ایمیل" },
  { id: 3, label: "نقش" },
  { id: 4, label: "تاریخ عضویت" },
  { id: 5, label: "" },
];

function Main({ users }: MainProps) {
  const router = useRouter();
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [fullUsers, setFullUsers] = useState<(User & { createdAt: Date })[]>([
    ...users,
  ]);
  const [usersSelected, setUsersSelected] = useState<
    (User & { createdAt: Date })[]
  >([...users]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setFullUsers([...users]);
    setUsersSelected([...users]);
    setSearch("");
  }, [users]);

  useEffect(() => {
    let filteredUsers = [...fullUsers];

    if (search) {
      filteredUsers = [...filteredUsers].filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setUsersSelected(filteredUsers);
  }, [search]);

  const changeRole = async (email: string) => {
    setIsShowLoader(true);

    const res = await fetch(`/api/users/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 201:
        Swal.fire({
          title: "نقش کاربر با موفقیت تغییر یافت",
          confirmButtonText: "متوجه شدم",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });

        router.refresh();
        break;

      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");
        break;
    }
  };

  const banUser = async (email: string) => {
    setIsShowLoader(true);

    const res = await fetch(`/api/users/ban`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 201:
        Swal.fire({
          title: "کاربر با موفقیت مسدود شد",
          confirmButtonText: "متوجه شدم",
          icon: "success",
          confirmButtonColor: "#1E5128",
        });

        router.refresh();
        break;

      default:
        showToast("خطایی رخ داده اتصال خود را چک کنید");
        break;
    }
  };

  const confirmation = (
    title: string,
    func: (email: string) => void,
    email: string
  ) => {
    Swal.fire({
      title,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "نه , پشیمان شدم",
      confirmButtonText: "بله",
      cancelButtonColor: "#1E5128",
      confirmButtonColor: "#636262",
      focusCancel: true,
    }).then((res) => {
      if (res.isConfirmed) {
        func(email);
      }
    });
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h4>کاربران</h4>
          </div>
          <div className={styles.filtering}>
            <div className={styles.search}>
              <input
                type="search"
                placeholder="جستجو بین کاربران"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.table}>
            <TableDetails
              columns={columns}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              rowsLength={usersSelected.length}
              isPagination={true}
            >
              {usersSelected
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={user._id.toString()}
                  >
                    <TableCell className={styles.cell} align="right">
                      {user.username}
                    </TableCell>
                    <TableCell className={styles.cell} align="right">
                      {user.email}
                    </TableCell>
                    <TableCell className={styles.cell} align="right">
                      {user.role === "ADMIN" ? "مدیر" : "کاربر عادی"}
                    </TableCell>
                    <TableCell className={styles.cell} align="right">
                      {convertToSolarDate(user.createdAt)}
                    </TableCell>
                    <TableCell className={styles.cell} align="right">
                      <button
                        className="btn btn-primary fs-5"
                        onClick={() =>
                          confirmation(
                            "ایا از تغییر نقش کاربر مطمئن هستید؟",
                            changeRole,
                            user.email
                          )
                        }
                      >
                        تغییر نقش
                      </button>
                      <button
                        className="btn btn-danger fs-5"
                        onClick={() =>
                          confirmation(
                            "ایا از مسدود کردن کاربر مطمئن هستید؟",
                            banUser,
                            user.email
                          )
                        }
                      >
                        مسدود کردن
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableDetails>
          </div>
        </div>
      </div>
      {isShowLoader ? <Loader /> : null}
    </>
  );
}

export default Main;
