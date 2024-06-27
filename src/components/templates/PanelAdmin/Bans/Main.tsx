"use client";

import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { useRouter } from "next/navigation";
import TableDetails from "@/components/modules/TableDetails/TableDetails";
import { TableCell, TableRow } from "@mui/material";
import { ObjectId } from "mongoose";
import Loader from "@/components/modules/Loader/Loader";
import { convertToSolarDate } from "@/helpers/date";
import Swal from "sweetalert2";
import showToast from "@/helpers/showToast";

type BlockedUsers = {
  email: string;
  createdAt: Date;
  _id: ObjectId;
};

type MainProps = { users: BlockedUsers[] };

const columns = [
  { id: 1, label: "ایمیل" },
  { id: 2, label: "تاریخ مسدود شدن" },
  { id: 3, label: "" },
];

function Main({ users }: MainProps) {
  const router = useRouter();
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [fullUsers, setFullUsers] = useState<BlockedUsers[]>([...users]);
  const [usersSelected, setUsersSelected] = useState<BlockedUsers[]>([
    ...users,
  ]);
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
      filteredUsers = [...filteredUsers].filter((user) =>
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setUsersSelected(filteredUsers);
  }, [search]);

  const rupeesBlockingUser = async (email: string) => {
    setIsShowLoader(true);

    const res = await fetch(`/api/users/ban`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 200:
        Swal.fire({
          title: "کاربر با موفقیت رفع مسدود شد",
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

  const rupeesBlockingConfirmation = (email: string) => {
    Swal.fire({
      title: "ایا از رفع مسدودیت کاربر اطمینان دارد ؟",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "نه , پشیمان شدم",
      confirmButtonText: "بله",
      cancelButtonColor: "#1E5128",
      confirmButtonColor: "#636262",
      focusCancel: true,
    }).then((res) => {
      if (res.isConfirmed) {
        rupeesBlockingUser(email);
      }
    });
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h4>کاربران مسدود شده</h4>
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
                      {user.email}
                    </TableCell>
                    <TableCell className={styles.cell} align="right">
                      {convertToSolarDate(user.createdAt)}
                    </TableCell>
                    <TableCell className={styles.cell} align="right">
                      <button
                        className="btn btn-danger fs-5"
                        onClick={() => rupeesBlockingConfirmation(user.email)}
                      >
                        رفع مسدودیت
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
