"use client";

import { useState } from "react";
import TextInput from '../components/TextInput';
import Link from 'next/link'
export default function Register() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Nickname: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    school: "",
    level: "",
    program: "",
    province: "",
    gpa: "",
    address: "",
    Instagram: "",
    LineID: "",
    News: "",
    Computer: "",
    PDPA: "", 
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: "",
    question11: "",
    question12: "",
    question13: "",
    question14: "",
    question15: "",
  });
  const [checked, setChecked] = useState(false);

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    setFormData((prev) => ({
      ...prev,
      PDPA: isChecked ? "ยอมรับเงื่อนไข" : "ไม่ยอมรับเงื่อนไข", // ✅ เก็บค่าลง formData
    }));
  };

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

  // const validateForm = () => {
  //   if (!formData.Name || !formData.Nickname) {
  //     setError("กรุณากรอกชื่อและนามสกุล");
  //     return false;
  //   }
  //   if (!formData.email || !formData.phone) {
  //     setError("กรุณากรอกอีเมลและเบอร์โทรศัพท์");
  //     return false;
  //   }
  //   if (!formData.school || !formData.level) {
  //     setError("กรุณากรอกข้อมูลการศึกษา");
  //     return false;
  //   }
  //   if (!file1 || !file2) {
  //     setError("กรุณาอัปโหลดเอกสารทั้งสองไฟล์");
  //     return false;
  //   }
  //   return true;
  // };

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
    alert(formData.PDPA)
    e.preventDefault();
    setError("");

    // if (!validateForm()) {
    //   return;
    // }

    setIsSubmitting(true);

    try {
      // Convert files to base64
      const file1Base64 = file1 ? await fileToBase64(file1) : '';
      const file2Base64 = file2 ? await fileToBase64(file2) : '';

      // Google Apps Script URL
      const googleScriptUrl = "https://script.google.com/macros/s/AKfycbwSrTQGfdb7OM650EeiIlONzwvTMzJxP3d-EFCBND7el0wxkE2s6hnz0-Nz9IFE0vzY/exec";

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
        Nickname: "",
        gender: "",
        dob: "",
        email: "",
        phone: "",
        school: "",
        level: "",
        program: "",
        province: "",
        gpa: "",
        address: "",
        Instagram: "",
        LineID: "",
        News: "",
        Computer: "",
        PDPA: "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        question6: "",
        question7: "",
        question8: "",
        question9: "",
        question10: "",
        question11: "",
        question12: "",
        question13: "",
        question14: "",
        question15: "",
      });
      setFile1(undefined);
      setFile2(undefined);
      setShowRegisterForm(false);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" h-full bg-cover bg-center w-full" style={{ backgroundImage: "url('/Group2.svg')" }}>
      {!showRegisterForm && (
      <section id="register1" className="min-h-screen flex flex-col justify-center items-center  from-slate-900 to-slate-800 bg-cover bg-center p-4 ">
        <div className="bg-white/5 backdrop-blur-2xl text-white p-8 rounded-3xl w-full max-w-2xl shadow-xl mt-30 mb-5">
          <h1 className="text-center text-2xl font-bold mb-8 text-amber-300">นโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)</h1>
          <p>แบบยินยอมการใช้ข้อมูลส่วนบุคคลตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 หรือ Personal Data Protection Act B.E. 2019 (PDPA) ที่มีผลบังคับใช้เมื่อวันที่ 1 มิถุนายน 2565 ที่ว่าการให้สิทธิ์กับเจ้าของข้อมูลส่วนบุคคล สร้างมาตรฐานการรักษาข้อมูลส่วนบุคคลให้ปลอดภัย และนำไปใช้ให้ถูกวัตถุประสงค์ตามคำยินยอมที่เจ้าของข้อมูลส่วนบุคคลอนุญาต ท่านสามารถศึกษา
            PDPA พรบ.ว่าด้วยการคุ้มครองข้อมูลส่วนบุคคลได้โดย <Link href="https://www.ratchakitcha.soc.go.th/DATA/PDF/2562/A/069/T_0052.PDF" target="_blank" className="text-amber-300">คลิกที่นี่</Link></p>
          <br />
          <p>ทางคณะกรรมการนักศึกษาวิทยาลัยสหวิทยาการ ศูนย์รังสิต มีความจำเป็นที่ต้องใช้ข้อมูลส่วนบุคคล ของท่านในกระบวนการเช่นจัดการผู้เข้าร่วมกิจกรรมบันทึกลงฐานข้อมูลกิจกรรมนำใช้เพื่อระบุตัวตน
            และใช้ติดต่อประสานงานซึ่งอาจมีการบันทึกภาพหรือวิดีโอในระหว่างกิจกรรมเพื่อใช้สำหรับการประชาสัมพันธ์หรือการสื่อสารโดยข้อมูลส่วนบุคคลของท่านจะถูกใช้ตามจุดประสงค์ที่ระบุข้างต้นเท่านั้น ผู้จัดเก็บข้อมูลไม่มีสิทธ์นำไปใช้ในจุดประสงค์อื่นโดยเด็ดขาด</p>
          <br />
          <div className="flex items-center justify-center  gap-2">
            <input
              type="checkbox"
              id="agree"
              checked={checked}
              onChange={handleChange2}
              className="w-5 h-5 accent-yellow-400 rounded-6xl"
            />
            <label htmlFor="agree" className="text-amber-300 text-xs">
              ยอมรับเงื่อนไขการใช้งาน
            </label>
          </div>
           <div className="w-full flex justify-center mt-6">
              <button
                onClick={() => {setShowRegisterForm(true);}}
                className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Go to Form
              </button>
            </div>
        </div>

      </section>
      )}



    {showRegisterForm && (
      <section id="register ">
        <div
          className="min-h-screen flex justify-center items-center  from-slate-900 to-slate-800 bg-cover bg-center p-4 "
        >
          <div className="bg-white/5 backdrop-blur-2xl text-white p-8 rounded-3xl w-full max-w-2xl shadow-xl mt-30 mb-5">
            <h1 className="text-center text-2xl font-bold mb-8">กรอกข้อมูลลงทะเบียนเข้าค่าย</h1>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div>
              <p className="font-semibold mb-3 text-lg">ข้อมูลส่วนตัว</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  name="Name"
                  value={formData.Name}
                  placeholder="ชื่อ - นามสกุล"
                  className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition md:col-span-2"
                  onChange={handleChange}
                  required
                />
                <input
                  name="Nickname"
                  value={formData.Nickname}
                  placeholder="ชื่อเล่น"
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
                  <option value="">คำนำหน้า</option>
                  <option value="นาย">นาย</option>
                  <option value="นางสาว">นางสาว</option>
                  <option value="ดช">ดช</option>
                  <option value="ดญ">ดญ</option>
                </select>



                <div className="flex items-center justify-between p-1 rounded-xl border border-gray-500 bg-white/10 text-gray-200">
                  {/* Label ด้านซ้าย */}
                  <label htmlFor="dob" className="font-semibold">
                    วันเกิด
                  </label>

                  {/* Input แบบโปร่งใส */}
                  <input
                    type="date"
                    name="dob"
                    placeholder="วันเกิด"
                    value={formData.dob}
                    className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition text-gray-300"
                    onChange={handleChange}
                  />

                  {/* ไอคอนปฏิทิน */}

                </div>
              </div>

              <input
                name="email"
                value={formData.email}
                placeholder="Email (ขอเป็น email ที่สามารถติดต่อได้ / จะแจ้งผลไปให้ email นี้)"
                type="email"
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition w-full mb-4"
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                value={formData.phone}
                placeholder="เบอร์โทรศัพท์"
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition w-full mb-4"
                onChange={handleChange}
                required
              />
              <input
                name="address"
                value={formData.address}
                placeholder="ที่อยู่ที่ติดต่อได้"
                className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition w-full mb-8"
                onChange={handleChange}
                required
              />
              <p className="text-red-600">*หากไม่ประสงค์กรอกโซเซียลมิเดียโปรดใส่ -</p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <input
                  name="Instagram"
                  value={formData.Instagram}
                  placeholder="Instagram"
                  className="p-3 w-full rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition"
                  onChange={handleChange}
                />
                <input
                  name="LineID"
                  value={formData.LineID}
                  placeholder="LineID"
                  className="w-full p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition"
                  onChange={handleChange}
                />
                <select
                  name="News"
                  value={formData.News}
                  className=" w-full p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition col-span-2"
                  onChange={handleChange}
                >
                  <option value="">ทราบข่าว World Of Data Camp จากช่องทางใด?</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="เพื่อน พี่ คนรู้จัก">เพื่อน พี่ คนรู้จัก</option>
                  <option value="โรงเรียนที่ศึกษาอยู่">โรงเรียนที่ศึกษาอยู่</option>
                  <option value="โรงเรียนที่ศึกษาอยู่">Thammasat Open House 2025</option>
                  <option value="โรงเรียนที่ศึกษาอยู่">CAMPHUB</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>

              <br />
              <br />
              <h1 className="text-center text-2xl font-bold mb-8">กรอกข้อมูลลงทะเบียนเข้าค่าย</h1>
              <div className="w-full bg-white/10 p-5 rounded-2xl backdrop-blur-2xl border border-gray-400 mb-5">
                <div className="flex flex-col  gap-3 w-full">
                  <p className="text-gray-200 ">สามารถนำ Laptop มาร่วมค่ายได้</p>

                  <select
                    name="Computer"
                    value={formData.Computer}
                    className="p-3 rounded-lg outline-none bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition col-span-2"
                    onChange={handleChange}
                  >
                    <option value="">เลือกคำตอบ</option>
                    <option value="สามารถนำมาได้">สามารถนำมาได้</option>
                    <option value="ไม่สามารถนำมาได้">ไม่สามารถนำมาได้</option>
                  </select>
                </div>
              </div>

              <TextInput
                name="question1"
                value={formData.question1}
                placeholder="พิมพ์คำตอบ"
                text="1. Please introduce yourself ยังไงก็ได้ให้เด่นให้ปังให้รู้สึกว่ายังไงก็ต้องเลือกฉันแล้วป่ะ"
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />

              <TextInput
                name="question2"
                value={formData.question2}
                placeholder="พิมพ์คำตอบ"
                text="2. เหตุผลที่เลือกสมัครค่ายนี้คืออะไร"
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />

              <TextInput
                name="question3"
                value={formData.question3}
                placeholder="พิมพ์คำตอบ"
                text="3. คุณคิดว่า Data มีความสำคัญต่อชีวิตประจำวันของเราอย่างไร"
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />

              <TextInput
                name="question4"
                value={formData.question4}
                placeholder="พิมพ์คำตอบ"
                text="4. หากคุณทำงานกลุ่มแต่เกิดการเข้าใจผิดกันเกิดขึ้น ในฐานะที่คุณเป็นหัวหน้าทีม คุณจะจัดการกับสถานการณ์นี้อย่างไร"
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />

              <TextInput
                name="question5"
                value={formData.question5}
                placeholder="พิมพ์คำตอบ"
                text="5. Output ของ code นี้คืออะไร"
                onChange={handleChange}
                required
                showImage={true}
                imageSrc="/question5.png"
                imageAlt="question5"
              />

              <TextInput
                name="question6"
                value={formData.question6}
                placeholder="พิมพ์คำตอบ"
                text="6. เมื่อพูดถึง field งานด้าน Data sci ก็จะเห็น Buzz word ต่าง ๆ อยู่อย่างมากมาย เช่น Ai, Big Data, Neural Network ให้หา buzz word ที่เกี่ยวข้องกับ field งานอย่างน้อย 3 คำ(ไม่ซ้ำกับตัวอย่าง) แล้วอธิบายให้สั้นกระชับได้ใจความและถูกต้องตามความหมายแท้จริงของ buzz word เหล่านั้น"
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />


              <TextInput
                name="question7"
                value={formData.question7}
                placeholder="พิมพ์คำตอบ"
                text="7. ถ้า 30 cm เท่ากับ 1 ฟุต แล้ว 2 ฟุต เท่ากับ 24 นิ้ว สรุปแล้ว python คืออะไรครับ งูหรือป่าว 🤔"
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />

              <TextInput
                name="question8"
                value={formData.question8}
                placeholder="พิมพ์คำตอบ"
                text="8. ถ้าสมมุติเปรียบ AI เป็นน้องดาต้า อายุ 5 ขวบ เรียนอนุบาลนกฮูก แล้วคุณต้องทำการสอนน้องดาต้า ในการแยกระหว่างคนกับแมว คุณจะมีวิธีการสอนน้องดาต้าอย่างไร"
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />

              <TextInput
                name="question9"
                value={formData.question9}
                placeholder="พิมพ์คำตอบ"
                text="9. แต่งเรื่องจากคำเหล่านี้อย่างไรก็ได้ให้ตลกที่สุด 1. DSI 2. ฉ่ำ 3. เริ่ด 4. อร่อย 5. ง่วง"
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />

              <TextInput
                name="question10"
                value={formData.question10}
                placeholder="พิมพ์คำตอบ"
                text="10. ถ้าเปรียบตัวคุณเป็นอาหาร คุณจะเป็นอาหารชนิดใด และเพราะเหตุใด"
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />


              <TextInput
                name="question11"
                value={formData.question11}
                placeholder="พิมพ์คำตอบ"
                text="11. ถ้าวันนี้คุณถูกหวย 30 ล้าน คุณจะเอาเงินไปทำอะไร"
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />


              <TextInput
                name="question12"
                value={formData.question12}
                placeholder="พิมพ์คำตอบ"
                text='12. ในการเข้ารหัสแบบหนึ่งให้ตัวเลข 102 หมายความว่า "ฉันกินข้าว" 607 หมายความว่า "ข้าวมีโปรตีน" 247 หมายความว่า "ฉันขาดโปรตีน" "ขาด" แทนด้วยรหัสอะไร'
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />

              <TextInput
                name="question13"
                value={formData.question13}
                placeholder="พิมพ์คำตอบ"
                text='13. ถ้าคุณขับรถซึ่งบรรทุกคน 43 คนจากชิคาโกไปพิสเบอร์ก แล้วหยุดรับอีก 7 คนขึ้นมา แล้วหยุดจอด ให้คนลงที่เคลเวอร์แลนด์ 5 คน จนมาถึงฟิลาเดอเฟียในอีก 20 ชั่วโมงต่อมา ถามว่าคนขับรถชื่ออะไร'
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />

              <TextInput
                name="question14"
                value={formData.question14}
                placeholder="พิมพ์คำตอบ"
                text='14. อยากให้ “พรุ่งนี้” เป็นเมื่อวาน วันนี้จะได้เป็น “วันศุกร์” ถามว่า “วันนี้” คือวันอะไร'
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />

              <TextInput
                name="question15"
                value={formData.question15}
                placeholder="พิมพ์คำตอบ"
                text='15. คุณคาดหวังว่าจะได้รับอะไรจากค่ายนี้'
                onChange={handleChange}
                required
                showImage={false}
                imageSrc=""
                imageAlt=""
              />


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
      </section>
      )}
    </div>
  );
}