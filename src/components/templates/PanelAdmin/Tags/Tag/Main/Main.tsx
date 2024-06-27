"use client";

import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { ObjectId } from "mongoose";
import TableDetails from "@/components/modules/TableDetails/TableDetails";
import Link from "next/link";
import { TableCell, TableRow } from "@mui/material";
import { convertToSolarDate } from "@/helpers/date";
import Loader from "@/components/modules/Loader/Loader";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import showToast from "@/helpers/showToast";

type Question = {
  _id: ObjectId;
  title: string;
  shortName: string;
  answersCount: number;
  user: { _id: ObjectId; username: string };
  createdAt: Date;
};

type MainProps = { questions: Question[],name:string };

const columns = [
  { id: 1, label: "عنوان" },
  { id: 2, label: "کاربر" },
  { id: 3, label: "تعداد پاسخ" },
  { id: 4, label: "تاریخ" },
  { id: 5, label: "" },
];

function Main({ questions,name }: MainProps) {
  const router = useRouter();
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [fullQuestions, setFullQuestions] = useState<Question[]>([
    ...questions,
  ]);
  const [questionsSelected, setQuestionsSelected] = useState<Question[]>([
    ...questions,
  ]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<"all" | "unanswered">("all");

  useEffect(() => {
    setFullQuestions([...questions]);
    setQuestionsSelected([...questions]);
    setSearch("");
    setType("all");
  }, [questions]);

  useEffect(() => {
    let filteredQuestions = [...fullQuestions];

    if (type === "unanswered") {
      filteredQuestions = [...filteredQuestions].filter(
        (question) => question.answersCount === 0
      );
    }

    if (search) {
      filteredQuestions = [...filteredQuestions].filter(
        (question) =>
          question.title.toLowerCase().includes(search.toLowerCase()) ||
          question.user.username.toLowerCase().includes(search.toLowerCase())
      );
    }

    setQuestionsSelected(filteredQuestions);
  }, [type, search]);

  const changeType = (type: "all" | "unanswered") => {
    setType(type);
  };

  const removeQuestion = async (shortName: string) => {
    setIsShowLoader(true);

    const res = await fetch(`/api/questions/${shortName}`, {
      method: "DELETE",
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 200:
        Swal.fire({
          title: "سوال با موفقیت حذف شد",
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

  const confirmationRemoveQuestion = (shortName: string) => {
    Swal.fire({
      title: "ایا از حذف سوال اطمینان دارید ؟",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "نه , پشیمان شدم",
      confirmButtonText: "بله",
      cancelButtonColor: "#1E5128",
      confirmButtonColor: "#636262",
      focusCancel: true,
    }).then((res) => {
      if (res.isConfirmed) {
        removeQuestion(shortName);
      }
    });
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h4>سوالات پرسیده شده {name}</h4>
          </div>
          <div className={styles.filtering}>
            <div className={styles.types}>
              <div className={styles.input_box}>
                <input
                  type="radio"
                  name="filter"
                  id="all"
                  checked={type !== "unanswered"}
                  onChange={(e) => e.target.checked && changeType("all")}
                />
                <label htmlFor="all">همه سوالات</label>
              </div>
              <div className={styles.input_box}>
                <input
                  type="radio"
                  name="filter"
                  id="unanswered"
                  checked={type === "unanswered"}
                  onChange={(e) => e.target.checked && changeType("unanswered")}
                />
                <label htmlFor="unanswered">سوالات بدون پاسخ</label>
              </div>
            </div>
            <div className={styles.search}>
              <input
                type="search"
                placeholder="جستجو بین سوالات"
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
              rowsLength={questionsSelected.length}
              isPagination={true}
            >
              {questionsSelected
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((question) => (
                  <TableRow
                    key={question._id.toString()}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell className={styles.cell} align="right">
                      <Link href={`/questions/${question.shortName}`}>
                        {question.title?.length > 20
                          ? `${question.title?.slice(0, 20)}...`
                          : question.title}
                      </Link>
                    </TableCell>
                    <TableCell className={styles.cell} align="right">
                      <Link href={`/user/${question.user?.username}`}>
                        {question.user?.username}
                      </Link>
                    </TableCell>
                    <TableCell className={styles.cell} align="right">
                      {question.answersCount}
                    </TableCell>
                    <TableCell className={styles.cell} align="right">
                      {convertToSolarDate(question.createdAt)}
                    </TableCell>
                    <TableCell
                      className={styles.cell}
                      align="right"
                      onClick={() =>
                        confirmationRemoveQuestion(question.shortName)
                      }
                    >
                      <button className="btn btn-danger fs-5">حذف سوال</button>
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
