"use client";

import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    school: "",
    level: "",
    program: "",
    province: "",
    gpa: "",
  });

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
    if (!formData.firstName || !formData.lastName) {
      setError("กรุณากรอกชื่อและนามสกุล");
      return false;
    }
    if (!formData.email || !formData.phone) {
      setError("กรุณากรอกอีเมลและเบอร์โทรศัพท์");
      return false;
    }
    if (!formData.school || !formData.level) {
      setError("กรุณากรอกข้อมูลการศึกษา");
      return false;
    }
    if (!file1 || !file2) {
      setError("กรุณาอัปโหลดเอกสารทั้งสองไฟล์");
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

    setIsSubmitting(true);

    try {
      // Convert files to base64
      const file1Base64 = file1 ? await fileToBase64(file1) : '';
      const file2Base64 = file2 ? await fileToBase64(file2) : '';

      // Google Apps Script URL
      const googleScriptUrl = "https://script.google.com/macros/s/AKfycbzIdn0qudw1gdaGXA5hhx_7alEKppR5vDD59JIHg7YAUnBhsoeYS44arm5KwSa-3fU/exec";

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
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        email: "",
        phone: "",
        school: "",
        level: "",
        program: "",
        province: "",
        gpa: "",
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

  return  (
    <div className=" h-full bg-cover bg-center w-full" style={{ backgroundImage: "url('/Group2.svg')" }}>
    <section id="register" >
      <div
        className="min-h-screen flex justify-center items-center  from-slate-900 to-slate-800 bg-cover bg-center p-4 "
      >
        <div className="bg-white/5 backdrop-blur-2xl text-white p-8 rounded-3xl w-full max-w-2xl shadow-xl mt-30 mb-5">
          <h1 className="text-center text-3xl font-bold mb-8">Register</h1>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div>
            <p className="font-semibold mb-3 text-lg">ข้อมูลส่วนตัว</p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                name="firstName"
                value={formData.firstName}
                placeholder="ชื่อ"
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition"
                onChange={handleChange}
                required
              />
              <input
                name="lastName"
                value={formData.lastName}
                placeholder="นามสกุล"
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition"
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <select
                name="gender"
                value={formData.gender}
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition"
                onChange={handleChange}
              >
                <option value="">เพศ</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition text-gray-300"
                onChange={handleChange}
              />
            </div>

            <input
              name="email"
              value={formData.email}
              placeholder="Email"
              type="email"
              className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition w-full mb-4"
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              value={formData.phone}
              placeholder="เบอร์โทรศัพท์"
              className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition w-full mb-8"
              onChange={handleChange}
              required
            />

            <p className="font-semibold mb-3 text-lg">ข้อมูลด้านการศึกษา</p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <input
                name="school"
                value={formData.school}
                placeholder="ชื่อโรงเรียน"
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition col-span-2"
                onChange={handleChange}
                required
              />
              <select
                name="level"
                value={formData.level}
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition"
                onChange={handleChange}
                required
              >
                <option value="">ระดับชั้น</option>
                <option value="ม.4">ม.4</option>
                <option value="ม.5">ม.5</option>
                <option value="ม.6">ม.6</option>
              </select>
            </div>

            <input
              name="program"
              value={formData.program}
              placeholder="สายการเรียน"
              className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition w-full mb-4"
              onChange={handleChange}
            />
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <input
                name="province"
                value={formData.province}
                placeholder="จังหวัดของโรงเรียน"
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition"
                onChange={handleChange}
              />
              <input
                name="gpa"
                type="number" min={0} max={4} step={0.25}
                value={formData.gpa}
                placeholder="เกรดเฉลี่ย"
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition"
                onChange={handleChange}
              />
            </div>

            <p className="font-semibold mb-3 text-lg">เอกสาร</p>

            <div className="mb-4">
              <p className="mb-2 text-sm text-gray-300">· ใบ ปพ 1 สําเนาในรูปแบบ PDF</p>
              <input
                type="file"
                id="idCard"
                name="idCard"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setFile1(e.target.files?.[0])}
              />
              <label
                htmlFor="idCard"
                className="flex items-center gap-2 justify-center cursor-pointer bg-white/10 backdrop-blur-2xl border border-gray-400 rounded-lg p-3 text-gray-300 hover:bg-white/20 hover:border-yellow-400 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className={file1 ? "text-green-400 font-semibold" : ""}>
                  {file1 ? file1.name : "Upload PDF"}
                </span>
              </label>
            </div>

            <div className="mb-6">
              <p className="mb-2 text-sm text-gray-300">· ใบขออนุญาตผู้ปกครอง ส่งมาในรูปแบบ PDF</p>
              <input
                type="file"
                id="idCard2"
                name="idCard2"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setFile2(e.target.files?.[0])}
              />
              <label
                htmlFor="idCard2"
                className="flex items-center gap-2 justify-center cursor-pointer bg-white/10 backdrop-blur-2xl border border-gray-400 rounded-lg p-3 text-gray-300 hover:bg-white/20 hover:border-yellow-400 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className={file2 ? "text-green-400 font-semibold" : ""}>
                  {file2 ? file2.name : "Upload PDF"}
                </span>
              </label>
            </div>

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
      </div>
    </section>
    </div>
  );
}