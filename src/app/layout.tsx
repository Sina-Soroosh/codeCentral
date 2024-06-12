import Footer from "@/components/modules/Footer/Footer";
import Header from "@/components/modules/Header/Header";
import "@/styles/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="main_child">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
