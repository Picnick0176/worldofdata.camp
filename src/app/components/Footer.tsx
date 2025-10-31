"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#262626]/90 backdrop-blur-2xl text-white w-full z-100" style={{ zIndex: 9999, position: 'relative'}}>
      {/* ส่วนบนของ Footer */}
      <div className="max-w-6xl mx-auto  px-6 py-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-8" style={{ zIndex: 9999, position: 'relative'}}>
        
        {/* ฝั่งซ้าย */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-3">
            <Image
              className="w-16"
              src="/camplogo.png"
              alt="camplogo Icon"
              width={100}
              height={100}
            />
            <Image
              className="w-16"
              src="/cislogo.png"
              alt="cislogo Icon"
              width={100}
              height={100}
            />
            <Image
              className="w-16"
              src="/TUlogo.png"
              alt="TUlogo Icon"
              width={100}
              height={100}
            />
          </div>
          <h2 className="text-2xl font-bold text-[#F7C500] mb-2">
            World of Data 2025
          </h2>

          {/* รวมข้อความกับรูปในบรรทัดเดียวกัน */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-3 mb-2">
            <p className="font-semibold">ช่องทางการติดต่อ :</p>
            <div className="flex gap-3">
              <Link href="https://www.facebook.com/profile.php?id=61582977063425" target="_blank">
                <Image
                  className="w-7"
                  src="/Facebook.svg"
                  alt="Facebook Icon"
                  width={100}
                  height={100}
                />
              </Link>
              <Link href="https://www.instagram.com/worldofdata_camp?igsh=ZzBsdXBqMDIzc3l5" target="_blank">
                <Image
                  className="w-7"
                  src="/Instagram.svg"
                  alt="Instagram Icon"
                  width={100}
                  height={100}
                />
              </Link>
              <Link href="https://www.tiktok.com/@worldofdata.camp?_t=ZS-90y7qlYeTH0&_r=1" target="_blank">
                <Image
                  className="w-7"
                  src="/Tiktok.png"
                  alt="Tiktok Icon"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          </div>
          <p className="font-semibold">หากพบปัญหาติดต่อ : 098-241-9055 (ลีโอ)</p>
        </div>

        {/* ฝั่งขวา */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.084402527753!2d100.60304991036308!3d14.07219308629696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e27fecb1e8d73f%3A0xe114a07c97a9a674!2z4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4LiY4Lij4Lij4Lih4Lio4Liy4Liq4LiV4Lij4LmMIOC4qOC4ueC4meC4ouC5jOC4o-C4seC4h-C4quC4tOC4lQ!5e0!3m2!1sth!2sth!4v1761831951630!5m2!1sth!2sth"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="w-80 h-52 rounded-xl"
          ></iframe>
          <p className="font-semibold mt-3">
            วิทยาลัยสหวิทยาการ สาขาวิทยาศาสตร์และนวัตกรรมข้อมูล
          </p>
          <p>มหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต</p>
        </div>
      </div>

      {/* ส่วนล่าง */}
      <div className="bg-[#262626] py-4 text-center text-sm text-gray-300">
        © 2025 - PICNICK DEV
      </div>
    </footer>
  );
}
