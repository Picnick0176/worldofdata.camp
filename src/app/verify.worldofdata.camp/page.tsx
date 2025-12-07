"use client";

import { useState, useEffect } from "react";
import TextInput from '../components/TextInput';
import Link from 'next/link'
export default function Register() {

  const [formData, setFormData] = useState({
    Name: "",
    Idline: "",
    lastname: "",
    statuscamp: "",
    food: "",
    disease: "",
    gender: "",
  });
  const [checked, setChecked] = useState(false);

  // โหลดค่าที่บันทึกไว้จาก localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // บันทึกค่าใหม่ทุกครั้งที่เปลี่ยน
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const [file1, setFile1] = useState<File | undefined>(undefined);
  const [file2, setFile2] = useState<File | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.Name || !formData.lastname) {
      setError("กรุณากรอกชื่อและนามสกุล");
      return false;
    }
    if (!formData.gender) {
      setError("กรุณากรอกคำนำหน้าชื่อ");
      return false;
    }

    if (!formData.Idline) {
      setError("กรุณากรอก ID Line พี่ๆจำเป็นต้องเอาไว้ติดต่อยืนยัน");
      return false;
    }

    if (!formData.food || !formData.disease ) {
      setError("กรุณากรอกข้อมูลอาหารและโรคประจำตัว");
      return false;
    }


    if (!file2) {
      setError("กรุณาอัปโหลดเอกสารขออนุญาติผู้ปกครอง");
      return false;
    }
    return true;
  };



  // Function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove the data:application/pdf;base64, prefix
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    // เวลาปัจจุบัน
    const now = new Date();

    // เวลาที่ไม่อนุญาตให้ส่ง (7 ธ.ค. 2025 เวลา 10:00)
    const deadline = new Date("2025-12-07T10:00:00+07:00");

    // if (now > deadline) {
    //   setError("ขออภัย หมดเวลาการส่งฟอร์มแล้ว (หลัง 7 ธ.ค. เวลา 10:00 น.)");
    //   return;
    // }

    setIsSubmitting(true);

    try {
      // Convert files to base64
      const file1Base64 = file1 ? await fileToBase64(file1) : '';
      const file2Base64 = file2 ? await fileToBase64(file2) : '';

      // Google Apps Script URL
      const googleScriptUrl = "https://script.google.com/macros/s/AKfycbw5O7-bHxQ-L9IsMmKsQxwhOnwXYXkMcJPmF05qxKqm7iAuZjBsft79RfsOZ9W2xnGP/exec";

      // Create form data with all fields
      const formDataToSend = new FormData();

      // Add all text fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Add base64 encoded files
      if (file1Base64 && file1) {
        formDataToSend.append("idCard", file1Base64);
        formDataToSend.append("idCardName", file1.name);
      }

      if (file2Base64 && file2) {
        formDataToSend.append("idCard2", file2Base64);
        formDataToSend.append("idCard2Name", file2.name);
      }

      const res = await fetch(googleScriptUrl, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok || data.status !== 200) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
      }

      console.log("sending data successfully", data);
      alert("สมัครติดตามข่าวสารเรียบร้อยแล้ว");

      // Reset form
      setFormData({
        Name: "",
        Idline: "",
        lastname: "",
        statuscamp: "",
        food: "",
        disease: "",
        gender: "",
      });
      setFile1(undefined);
      setFile2(undefined);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" h-full bg-cover bg-center w-full" style={{ backgroundImage: "url('/Group2.svg')" }}>





      <section id="register ">
        <div
          className="min-h-screen flex justify-center items-center  from-slate-900 to-slate-800 bg-cover bg-center p-4 "
        >
          <div className="bg-white/5 backdrop-blur-2xl text-white p-8 rounded-3xl w-full max-w-2xl shadow-xl mt-30 mb-5">
            <h1 className="text-center text-2xl font-bold mb-8">ยืนยันสิทธ์เข้าค่าย  World of Data Camp 2025</h1>


            <div>
              <p className="font-semibold mb-3 text-lg">ข้อมูลส่วนตัว</p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <select
                  name="gender"
                  value={formData.gender}
                  className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition"
                  onChange={handleChange}
                >
                  <option value="">คำนำหน้า</option>
                  <option value="นาย">นาย</option>
                  <option value="นางสาว">นางสาว</option>
                  <option value="เด็กชาย">เด็กชาย</option>
                  <option value="เด็กหญิง">เด็กหญิง</option>
                </select>
                <input
                  name="Name"
                  value={formData.Name}
                  placeholder="ชื่อ"
                  className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition col-span-2 "
                  onChange={handleChange}
                  required
                />
                <input
                  name="lastname"
                  value={formData.lastname}
                  placeholder="นามสกุล"
                  className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition col-span-2 "
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  name="Idline"
                  value={formData.Idline}
                  placeholder="ID LINE"
                  className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition"
                  onChange={handleChange}
                  required
                />

                <select
                  name="statuscamp"
                  value={formData.statuscamp}
                  className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition"
                  onChange={handleChange}
                >
                  <option value="ยืนยันสิทธ์เข้าค่าย">ยืนยันสิทธ์เข้าค่าย</option>
                  <option value="สละสิทธ์">สละสิทธ์</option>
                </select>
              </div>

              <input
                name="food"
                value={formData.food}
                placeholder="อาหารและยาที่แพ้หรือไม่รับประทาน(หากไม่มีให้ใส่ -)"
                type="text"
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition w-full mb-4"
                onChange={handleChange}
                required
              />

              <input
                name="disease"
                value={formData.disease}
                placeholder="โรคประจำตัว(หากเป็นภูมิแพ้ กรุณาระบุให้ละเอียดว่าแพ้อะไร // หากไม่มีให้ใส่ - )"
                type="text"
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition w-full mb-4"
                onChange={handleChange}
                required
              />

              <div className="p-3  text-lgrounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition w-full mb-4">
                <h1 className="text-3xl text-yellow-400">ค่าสวัสดิการและที่พัก</h1>
                <p >ค่าสวัสดิการและที่พักตลอด 3 วัน 2 คืน</p>
                <p >ธนาคารกสิกรไทย</p>
                <p >เลขที่บัญชี 1943641540</p>
                <p >ชื่อบัญชี นางสาวจรรยาภรณ์ ธเนศเศรษฐ์</p>
                <p >จำนวนเงิน 450 บาท <br /><span className="text-red-600">**(เฉพาะน้องๆ ตัวจริงเท่านั้น รายชื่อสำรองจะมีการติดต่อชำระเงินภายหลัง)</span></p>
              </div>
              <p className="text-white text-lg">*โปรดแนบหลักฐานการชำระเงิน</p>



              <div className="relative">
                <input
                  type="file"
                  id="file-upload-1"
                  onChange={(e) => setFile1(e.target.files?.[0])}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload-1"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white/10 backdrop-blur-2xl border border-gray-400 hover:border-yellow-400 focus:border-yellow-400 transition rounded-lg cursor-pointer hover:bg-white/20"
                >
                  {file1 ? (
                    <>
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white truncate">{file1.name}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-gray-300">Upload</span>
                    </>
                  )}
                </label>
              </div>
              <br />
              <p className="text-white text-lg">*หนังสือขออนุญาตผู้ปกครอง</p>
              <p className="text-[#F7C400] m-2">ดาวห์โหลดได้ที่นี่ : <Link className='underline' href="/หนังสือขอความยินยอมจากผู้ปกครอง.pdf" >หนังสือขอความยินยอมจากผู้ปกครอง</Link></p>
              <div className="relative">
                <input
                  type="file"
                  id="file-upload-2"
                  onChange={(e) => setFile2(e.target.files?.[0])}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload-2"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white/10 backdrop-blur-2xl border border-gray-400 hover:border-yellow-400 focus:border-yellow-400 transition rounded-lg cursor-pointer hover:bg-white/20"
                >
                  {file2 ? (
                    <>
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white truncate">{file2.name}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-gray-300">Upload</span>
                    </>
                  )}
                </label>
              </div>


            </div>
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "กำลังส่งข้อมูล..." : "CONFIRM"}
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}