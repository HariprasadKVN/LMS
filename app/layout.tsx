import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen">
          <Header></Header>
          <Toaster position="top-right"/>
          {children}
          <Footer></Footer>
        </main>
      </body>
    </html>
  );
}
