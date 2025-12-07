"use client";

import { useEffect, useState } from "react";

interface Student {
  "ชื่อจริง (ไม่ต้องมีคำนำหน้า)": string;
  "นามสกุล": string;
  "ชื่อเล่น": string;
  "สถาบันการศึกษา": string;
  "สถานะ": string;
}

export default function PassedTable() {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbx15GoM2kCt2dWPtWZDCF8L0zoLh9ZplamUlJQi1KeD21cXsBBFW5CmwfllzfnLRsWrdQ/exec",
          { cache: "no-store" }
        );

        const json = await res.json();
        console.log("DEBUG JSON:", json);

        let rows: any[] = [];

        if (Array.isArray(json)) {
          rows = json;
        } else if (json.data && Array.isArray(json.data)) {
          rows = json.data;
        } else {
          console.error("❌ รูปแบบข้อมูลจาก API ไม่ถูกต้อง:", json);
          setData([]);
          return;
        }

        const passed = rows.filter((item) => item["สถานะ"] === "ผ่าน");
        setData(passed);

      } catch (err) {
        console.error("โหลดข้อมูลผิดพลาด:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">รายชื่อผู้ผ่าน</h2>

      {loading ? (
        <p className="text-white">กำลังโหลดข้อมูล...</p>
      ) : data.length === 0 ? (
        <p className="text-red-400">ไม่พบข้อมูล</p>
      ) : (
        <table className="w-full border-collapse bg-white/10 backdrop-blur-xl rounded-lg overflow-hidden shadow-xl">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 border">ชื่อจริง</th>
              <th className="p-3 border">นามสกุล</th>
              <th className="p-3 border">ชื่อเล่น</th>
              <th className="p-3 border">สถาบันการศึกษา</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="text-center bg-white/5 hover:bg-white/20 transition"
              >
                <td className="p-3 border">
                  {item["ชื่อจริง (ไม่ต้องมีคำนำหน้า)"]}
                </td>
                <td className="p-3 border">{item["นามสกุล"]}</td>
                <td className="p-3 border">{item["ชื่อเล่น"]}</td>
                <td className="p-3 border">{item["สถาบันการศึกษา"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
