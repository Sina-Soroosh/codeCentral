import Main from "@/components/templates/Home/Main/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحه اصلی - مرکز کد",
};

export default function Home() {
  return (
    <>
      <Main />
    </>
  );
}
