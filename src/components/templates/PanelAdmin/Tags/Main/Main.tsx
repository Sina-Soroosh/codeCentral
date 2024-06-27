"use client";
import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "@mui/material";
import TableDetails from "@/components/modules/TableDetails/TableDetails";
import Loader from "@/components/modules/Loader/Loader";
import { Tag } from "@/types/Tags.types";
import Link from "next/link";
import Swal from "sweetalert2";
import showToast from "@/helpers/showToast";
import withReactContent from "sweetalert2-react-content";

type MainProps = { tags: Tag[] };

const columns = [
  { id: 1, label: "عنوان" },
  { id: 2, label: "نام کوتاه" },
  { id: 3, label: "" },
];

function Main({ tags }: MainProps) {
  const router = useRouter();
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [fullTags, setFullTags] = useState<Tag[]>([...tags]);
  const [tagsSelected, setTagsSelected] = useState<Tag[]>([...tags]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const swal = withReactContent(Swal);

  useEffect(() => {
    setFullTags([...tags]);
    setTagsSelected([...tags]);
    setSearch("");
  }, [tags]);

  useEffect(() => {
    let filteredTags = [...fullTags];

    if (search) {
      filteredTags = [...filteredTags].filter((tag) =>
        tag.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTagsSelected(filteredTags);
  }, [search]);

  const removeTag = async (shortName: string) => {
    setIsShowLoader(true);

    const res = await fetch(`/api/tags/${shortName}`, {
      method: "DELETE",
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 200:
        Swal.fire({
          title: "برچسب با موفقیت حذف شد",
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

  const confirmationRemoveTag = (shortName: string) => {
    Swal.fire({
      title: "ایا از حذف برچسب اطمینان دارید ؟",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "نه , پشیمان شدم",
      confirmButtonText: "بله",
      cancelButtonColor: "#1E5128",
      confirmButtonColor: "#636262",
      focusCancel: true,
    }).then((res) => {
      if (res.isConfirmed) {
        removeTag(shortName);
      }
    });
  };

  const updateTagHandler = async (
    shortName: string,
    newTitle: string,
    newShortName: string
  ) => {
    setIsShowLoader(true);

    const res = await fetch(`/api/tags/${shortName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, shortName: newShortName }),
    });

    setIsShowLoader(false);

    switch (res.status) {
      case 422:
        showToast("مقادیر ارسالی صحیح نیست");
        break;
      case 409:
        showToast("برچسبی با این نام کوتاه وجود دارد");
        break;
      case 200:
        Swal.fire({
          title: "برچسب با موفقیت حذف شد",
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

  const updateTag = (tag: Tag) => {
    let title = tag.title;
    let shortName = tag.shortName;

    swal
      .fire({
        title: "اطلاعات جدید را وارد کنید",
        html: (
          <>
            <div className={styles.form_update}>
              <label htmlFor="title">نام</label>
              <input
                type="text"
                id="title"
                defaultValue={title}
                onChange={(e) => (title = e.target.value)}
              />
              <label htmlFor="shortName">نام کوتاه</label>
              <input
                type="text"
                id="shortName"
                defaultValue={shortName}
                onChange={(e) => (shortName = e.target.value)}
              />
            </div>
          </>
        ),
        confirmButtonText: "ثبت اطلاعات",
        confirmButtonColor: "#4E9F3D",
      })
      .then((res) => {
        if (res.isConfirmed) {
          if (!title || title.length < 3) {
            showToast("نام برچسب باید حداقل 3 کارکتر باشد");

            return;
          }

          if (!shortName || shortName.length < 3) {
            showToast("نام کوتاه برچسب باید حداقل 3 کارکتر باشد");

            return;
          }

          updateTagHandler(tag.shortName, title, shortName);
        }
      });
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h4>برچسب ها</h4>
          </div>
          <div className={styles.filtering}>
            <div className={styles.search}>
              <input
                type="search"
                placeholder="جستجو بین برچسب ها"
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
              rowsLength={tagsSelected.length}
              isPagination={true}
            >
              {tagsSelected
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tag) => (
                  <TableRow
                    key={tag._id.toString()}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell className={styles.cell} align="right">
                      <Link href={`/p-admin/tags/${tag.shortName}`}>
                        {tag.title?.length > 20
                          ? `${tag.title?.slice(0, 20)}...`
                          : tag.title}
                      </Link>
                    </TableCell>
                    <TableCell className={styles.cell} align="right">
                      <Link href={`/p-admin/tags/${tag.shortName}`}>
                        {tag.shortName?.length > 20
                          ? `${tag.shortName?.slice(0, 20)}...`
                          : tag.shortName}
                      </Link>
                    </TableCell>
                    <TableCell className={styles.cell} align="right">
                      <button
                        className="btn btn-primary fs-5"
                        onClick={() => updateTag({ ...tag })}
                      >
                        بروزرسانی برچسب
                      </button>
                      <button
                        className="btn btn-danger fs-5"
                        onClick={() => confirmationRemoveTag(tag.shortName)}
                      >
                        حذف برچسب
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
