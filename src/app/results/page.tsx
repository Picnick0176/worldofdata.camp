"use client";
import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Search, CheckCircle, XCircle } from "lucide-react";

interface Person {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  school: string;
  status: string;
  id: string;
}

export default function RegisterComingSoon() {
  // แทนที่ URL นี้ด้วย Apps Script URL ของคุณ
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzkp0pOOn_Fdt-Bmp7z049TYiU5EuFnrCpX3SMWKF2wDYPnUYfKwYqb-9ckgDkRzPm_/exec';

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("กรุณากรอกชื่อ-นามสกุล หรือเบอร์มือถือ");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const url = `${APPS_SCRIPT_URL}?query=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลได้');
      }

      const result = await response.json();
      setSearchResults(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการค้นหา');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearched(false);
    setError("");
  };

  return (
    <div className="min-h-screen from-slate-900 via-slate-800 to-slate-900 flex items-center flex flex-col justify-between p-4 bg-cover bg-center" style={{ backgroundImage: "url('/Group2.svg')" }}>
      <section id="Qualification" className="flex flex-col items-center justify-center text-center mt-30 z-100" style={{ zIndex: 9999, position: 'relative' }}>
        <h1 className="text-2xl flex items-center gap-2 transition mb-4">
          <Image className="w-10" src="/Done.svg" alt="Qualification Icon" width={100} height={100} />
          ขั้นตอนการยืนยัน
        </h1>

        <div data-aos="fade-up-right" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center items-center">
          <div className="bg-white/3 backdrop-blur-xl w-70 h-70 text-white p-3 rounded-xl flex flex-col items-center justify-center text-center gap-5">
            <Image className="w-30" src="/ID Verified.svg" alt="Qualification Icon" width={100} height={100} />
            <p className="text-2xl mt-2">ตรวจสอบรายชื่อ</p>
          </div>
          <div className="bg-white/3 backdrop-blur-xl w-70 h-70 text-white p-3 rounded-xl flex flex-col items-center justify-center text-center gap-5">
            <Image className="w-30" src="/Terms and Conditions.svg" alt="Qualification Icon" width={100} height={100} />
            <p className="text-2xl mt-2">กรอกฟอร์มยืนยัน</p>
          </div>
          <div className="bg-white/3 backdrop-blur-xl w-70 h-70 text-white p-3 rounded-xl flex flex-col items-center justify-center text-center gap-5">
            <Image className="w-30" src="/Mobile Payment.svg" alt="Qualification Icon" width={100} height={100} />
            <p className="text-2xl mt-2">ชำระค่าสมัคร</p>
          </div>
          <div className="bg-white/3 backdrop-blur-xl w-70 h-70 text-white p-3 rounded-xl flex flex-col items-center justify-center text-center gap-5">
            <Image className="w-30" src="/Order Completed.svg" alt="Qualification Icon" width={100} height={100} />
            <p className="text-xl mt-2">ประการผู้มีสิทธ์เข้าร่วมค่าย</p>
          </div>
        </div>
      </section>

      <div className="text-center bg-white/5 backdrop-blur-2xl text-white md:p-20 p-6 rounded-3xl w-full max-w-290 shadow-xl mt-5 mb-5 flex flex-col gap-5">
        <div>
          <h1 className='md:text-5xl text-3xl'>ตรวจสอบผลการคัดเลือก</h1>
          <h2 className='md:text-3xl text-xl text-[#F7C400]'>World of Data Camp 2025</h2>
        </div>

        <div className="relative w-full">
          <input
            name="results"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="กรอกชื่อ-นามสกุล/เบอร์มือถือ"
            className="p-3 pr-12 rounded-lg outline-none bg-white/10 
              backdrop-blur-2xl border border-gray-400 
              focus:border-yellow-400 transition w-full mb-4"
            disabled={loading}
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="absolute right-3 top-1/3 -translate-y-1/2 text-gray-200 hover:text-yellow-400 transition disabled:opacity-50"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 py-4">
            <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-300">กำลังค้นหา...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200">
            <p>❌ {error}</p>
            <button
              onClick={handleReset}
              className="mt-2 text-sm underline hover:text-white"
            >
              ลองใหม่อีกครั้ง
            </button>
          </div>
        )}

        {/* Search Results */}
        {!loading && searched && searchResults.length === 0 && !error && (
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 text-center">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <p className="text-xl mb-2">ไม่พบข้อมูล</p>
            <p className="text-gray-300 text-sm mb-4">
              ไม่พบรายชื่อที่ตรงกับ "{searchQuery}"
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
            >
              ค้นหาใหม่
            </button>
          </div>
        )}

        {!loading && searchResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-300">พบ {searchResults.length} รายการ</p>
              <button
                onClick={handleReset}
                className="text-sm px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition"
              >
                ค้นหาใหม่
              </button>
            </div>

            {searchResults.map((person, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-lg p-5 border border-white/20 hover:border-yellow-400/50 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-yellow-400 mb-1">
                      {person.firstName} {person.lastName}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>📞 {person.phone}</p>
                      <p>📧 {person.email}</p>
                      <p>🏫 {person.school}</p>
                    </div>
                  </div>

                  {/* <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${person.status.toLowerCase().includes('ผ่าน') || person.status.toLowerCase().includes('pass')
                    ? 'bg-green-500/20 text-green-300 border border-green-500'
                    : 'bg-red-500/20 text-red-300 border border-red-500'
                    }`}>
                    {person.status.toLowerCase().includes('ผ่าน') || person.status.toLowerCase().includes('pass') ? (
                      <>
                        <CheckCircle size={18} />
                        <span className="font-bold">ผ่าน</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={18} />
                        <span className="font-bold">ไม่ผ่าน</span>
                      </>
                    )}
                  </div> */}

                </div>

                {person.status.toLowerCase().includes('ผ่าน') || person.status.toLowerCase().includes('pass') ? (
                  // ผ่าน
                  <div className="m-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <p className="text-green-300 text-sm">
                      ✅ ยินดีด้วย! คุณผ่านการคัดเลือก กรุณาดำเนินการตามขั้นตอนถัดไป
                    </p>
                  </div>

                ) : person.status.toLowerCase().includes('สำรอง') || person.status.toLowerCase().includes('reserve') ? (
                  // สำรอง
                  <div className="m-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                    <p className="text-yellow-300 text-sm">
                      ⚠️ คุณอยู่ในรายชื่อสำรอง หากมีที่ว่างทีมงานจะติดต่อกลับทางอีเมล กรุณารอการยืนยัน
                    </p>
                  </div>

                ) : (
                  // ไม่ผ่าน
                  <div className="m-4 p-3 bg-red-500/20 rounded-lg border border-red-500">
                    <p className="text-red-300 text-sm">
                      ❌ ขอแสดงความเสียใจด้วย! คุณไม่ผ่านการคัดเลือก ขอบคุณที่สนใจค่าย World of Data Camp 2025
                    </p>
                  </div>
                )}


                {person.status.toLowerCase().includes('ผ่าน') || person.status.toLowerCase().includes('pass') || person.status.toLowerCase().includes('สำรอง') || person.status.toLowerCase().includes('reserve') ? (
                  
                  <Link
                    href='/verify.worldofdata.camp'
                    className="px-8 py-3 mt-10 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >กรอกข้อมูลยืนยันผล
                  </Link>
                ) : null}

              </div>
            ))}
          </div>
        )}

        {/* <div className='flex gap-2 items-center justify-center text-center mt-4'>
          <Image className="w-5" src="/Case Study.svg" alt="Case Study Icon" width={100} height={100} />
          <Link 
            href="/official-results" 
            target="_blank" 
            className="text-white/70 hover:text-yellow-400 transition"
          >
            รายชื่อผู้ที่ผ่านการคัดเลือกทั้งหมด
          </Link>
        </div> */}
      </div>
    </div>
  );
}