
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navber";
import Footer from "./components/Footer";
import {FogEffect} from "./components/FogEffect";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World of Data 2025",
  description:
    "การกลับมาอย่างยิ่งใหญ่ของหนึ่งในค่ายที่เรียกได้ว่าปังมากที่สุดแห่งปี \"ค่าย World Of Data Camp\" ซึ่งในปีนี้เรากลับมาในธีม The Order of Data Wizardry และยังคงเป็น ค่ายที่อัดแน่น ไปด้วยความสนุก สนานและสาระความรู้ในเรื่องของ Data ที่ทั้งจัดหนัก จัดเต็ม และการันตี ความเจ้มจ้ม เอ้ย! เข้มข้น ผ่านกิจกรรม Workshop ต่าง ๆ ที่จะทำให้ทุกคนรู้จัก และเข้าใจถึง ศาสตร์แห่งอนาคต Data Science มากยิ่งขึ้นนั่นเอง แต่ ๆ ๆ ๆ ค่ายนี้ไม่ได้มีแค่ ความรู้และ ความสนุกเพียงเท่านั้น ยังมีการมอบ e-Certificate ให้ทุก ๆ ท่านที่เข้าร่วมงานอีกด้วย",

  icons: {
    icon: [
      { url: "/favicon.ico" }, // Windows, Browser
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }, // macOS / iOS
    ],
  },

  manifest: "/site.webmanifest", // สำหรับ PWA (optional)

  openGraph: {
    title: "World of Data 2025 - The Order of Data Wizardry",
    description: "ค่าย World Of Data Camp",
    url: "",
    type: "website",
    images: [
      {
        url: "/camplogo.png", // แนะนำให้ใช้ path เต็ม หรือ /public/camplogo.png
        width: 1200,
        height: 630,
        alt: "World of Data 2025 Banner",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics/>
        <Navbar />
        {children}
        <Footer />
         <FogEffect 
        particleCount={60}  // จำนวนอนุภาค
        color1="6, 11, 21" // สีม่วงอ่อน
        color2="15, 27, 53"  // สีม่วงเข้ม
        opacity={0.4}         // ความโปร่งแสงของหมอก
        speed={1}             // ความเร็วของการเคลื่อนไหว
        zIndex={1}           // ลำดับชั้น
      />
      </body>
    </html>
  );
}
