import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "@/components/Head";
import BottomBar from "@/components/BottomBar";
import Provider from "@/components/Context";
import Toast from '@/components/Toast'
import ToastContainer from "@/components/ToastContainer";

export const metadata: Metadata = {
  title: "Jesus Connect",
  description: "Spiritual platform to help you grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased relative`}
      >
        <Provider>
          <Head />
          {children}
          <ToastContainer />
          {/* <BottomBar /> */}
        </Provider>
      </body>
    </html>
  );
}
