"use client";
import Image from "next/image";
import Gallery from "./components/Gallery";
import Follow from "./components/follow";
import { FloatingElement } from "./components/FloatingElement";
import Link from 'next/link'
import AOS from "aos";
import "aos/dist/aos.css";
import { Instagram, Facebook } from "lucide-react";
import { useState, useRef, useEffect } from "react";


export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.15;
          await audioRef.current.play();
        }
      } catch (error) {
        const handleUserInteraction = async () => {
          try {
            if (audioRef.current) {
              await audioRef.current.play();
              document.removeEventListener("click", handleUserInteraction);
            }
          } catch (err) {
            console.log("Cannot play audio:", err);
          }
        };
        document.addEventListener("click", handleUserInteraction);
      }
    };
    playAudio();
  }, []);
  const [buttonText, setButtonText] = useState("🔇 ปิดเพลง");

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !audioRef.current.muted;
      audioRef.current.muted = newMuted;
      setMuted(newMuted);
      setButtonText(newMuted ? "🔈 เปิดเสียง" : "🔇 ปิดเพลง");
    }
  };



  const images = ["/News.png"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const close_audio = () => {
    alert('d');
  };

  return (
    <div className="w-full  h-full bg-[#060B15] text-white  ">
      <audio
        ref={audioRef}
        loop
        autoPlay
      >
        <source src="/TheRoomofRequirements.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <section
        id="home"
        className="bg-cover bg-center w-full flex flex-col  items-center justify-center text-center min-h-screen z-[100] "
        style={{ backgroundImage: "url('/Group2.svg')" }}
      >
        <div data-aos="fade-up" className="flex flex-col items-center justify-center text-center z-100">
          <h1 className="text-xl font-bold mb-3 lg:mb-10 sm:text-xl lg:text-5xl text-white">World of Data Camp 2025</h1>
          <h1 className="text-3xl font-bold mb-3 lg:mb-10 sm:text-xl lg:text-7xl text-[#F7C500]">The Order of Data Wizardry</h1>


          <div className="flex gap-3 items-center text-white">
            <Link href="https://www.instagram.com/worldofdata.camp?igsh=ZzBsdXBqMDIzc3l5" target="_blank" className="flex items-center gap-2 hover:text-pink-500 transition">
              <Instagram className="w-8" />
            </Link>
            <Link href="https://www.tiktok.com/@worldofdata.camp?_t=ZS-90y7qlYeTH0&_r=1" target="_blank">
              <Image
                className="w-6 flex items-center gap-2 hover:text-blue-600 transition"
                src="/Tiktok.png"
                alt="Tiktok Icon"
                width={100}
                height={100}
              />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61582977063425" target="_blank" className="flex items-center gap-2 text-xl hover:text-blue-600 transition">
              <Facebook className="w-8" /> : worldofdata.camp
            </Link>

          </div>


        </div>
                  <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 bg-black/40 text-white p-3 rounded-3xl backdrop-blur-md hover:bg-black/60 transition-all"
          >
          {buttonText}
          </button>
      </section>



      <section id="about" className="flex flex-col items-center justify-center text-center min-h-screen py-20 z-100" style={{ zIndex: 9999, position: 'relative' }}>
        <h1 className="text-2xl flex items-center gap-2 transition">
          <Image className="w-10" src="/bookl.svg" alt="Book Icon" width={100} height={100} />
          About
        </h1>



        <div className="bg-[#0E1015] text-white p-8 mt-10 rounded-3xl flex flex-col lg:flex-row items-center gap-8 max-w-2xl lg:max-w-6xl mx-auto shadow-xl ">

          <div data-aos="fade-right" className="w-full md:w-1/2 rounded-2xl overflow-hidden">
            <Image
              src="/DSC_0046.JPG"
              alt="World of Data 2025"
              width={800}
              height={600}
              className="rounded-2xl object-cover w-full h-full"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-3 text-left">
            <h1 className="text-[#F7C500] text-2xl font-semibold">World of data 2025</h1>
            <p data-aos="zoom-in-up" className="text-gray-300 leading-relaxed">
              การกลับมาอย่างยิ่งใหญ่ของหนึ่งในค่ายที่เรียกได้ว่าปังมากที่สุดแห่งปี "ค่าย World Of Data Camp" ซึ่งในปีนี้เรากลับมาในธีม The Order of Data Wizardry และยังคงเป็น ค่ายที่อัดแน่น ไปด้วยความสนุกสนานและสาระความรู้ในเรื่องของ Data ที่ทั้งจัดหนัก จัดเต็ม และการันตี ความเจ้มจ้ม เอ้ย! เข้มข้น ผ่านกิจกรรม Workshop ต่าง ๆ ที่จะทำให้ทุกคนรู้จัก และเข้าใจถึง ศาสตร์แห่งอนาคต Data Science มากยิ่งขึ้นนั่นเอง แต่ ๆ ๆ ๆ ค่ายนี้ไม่ได้มีแค่ ความรู้และ ความสนุกเพียงเท่านั้น ยังมีการมอบ e-Certificate ให้ทุก ๆ ท่านที่เข้าร่วมงานอีกด้วย
            </p>

            <h2 className="text-[#F7C500] text-xl font-semibold pt-4">Coding Language :</h2>

            <div data-aos="fade-up" data-aos-duration="1000" className="flex flex-wrap gap-4">

              <div className="bg-[#1A1C22] p-4 rounded-xl flex items-center gap-3 w-56">
                <Image src="/Python.png" alt="Python" width={40} height={40} className="object-contain" />
                <div className="w-full">
                  <p className="font-semibold">Python</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-[#F7C500] h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 ml-2">100%</p>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Qualification Section */}
      <section id="Qualification" className="flex flex-col items-center justify-center text-center py-20 z-100" style={{ zIndex: 9999, position: 'relative' }}>
        <h1 className="text-2xl flex items-center gap-2 transition mb-4">
          <Image className="w-10" src="/Qualification.svg" alt="Qualification Icon" width={100} height={100} />
          Qualification
        </h1>

        <div data-aos="fade-up-right" className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
          <div className="bg-[#0E1015] w-full h-40 text-white p-3 rounded-3xl flex justify-center items-center gap-3">
            <div className="flex rounded-full bg-[#333333] w-20 h-20 items-center justify-center">
              <Image className="w-10" src="/Student Center.svg" alt="Qualification Icon" width={100} height={100} />
            </div>
            <p className="text-xl text-left w-60">กำลังศึกษาอยู่มัธยมปีที่ 4 - 6 หรือเทียบเท่า</p>
          </div>

          <div className="bg-[#0E1015] w-full h-40 text-white p-3 rounded-3xl flex justify-center items-center gap-3">
            <div className="flex rounded-full bg-[#333333] w-20 h-20 items-center justify-center">
              <Image className="w-10" src="/Childrens Backpack.svg" alt="Qualification Icon" width={100} height={100} />
            </div>
            <p className="text-xl text-left w-60">สามารถมาร่วมกิจกรรมได้ในวันที่กำหนด</p>
          </div>

          <div data-aos="fade-up" className="bg-[#0E1015] h-40 text-white p-3 rounded-3xl flex justify-center items-center gap-3 sm:col-span-2 mx-auto w-fit">
            <div className="flex rounded-full bg-[#333333] w-20 h-20 items-center justify-center">
              <Image className="w-10" src="/Banknotes.svg" alt="Banknotes Icon" width={100} height={100} />
            </div>
            <div className="flex flex-col items-start w-60">
              <div className="flex items-baseline text-xl text-left">
                <span>ค่าสมัครเข้าค่าย</span>
                <span className="text-2xl ml-2 text-[#F7C500]">450 บาท</span>
              </div>
              <p className="text-sm text-left mt-2 text-red-500">(ชำระหลังประกาศรายชื่อ)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Section */}
      <section id="Activity" className="flex flex-col items-center justify-center text-center py-20 z-100" style={{ zIndex: 9999, position: 'relative' }}>
        <h1 className="text-2xl flex items-center gap-2 font-semibold mb-6">
          <Image className="w-8" src="/news.svg" alt="Activity Icon" width={100} height={100} />
          Activity
        </h1>

        <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="bg-[#0E1015] text-white p-10 m-4 rounded-3xl flex flex-col gap-10 max-w-4xl w-full mx-auto shadow-xl">

          <div className="flex items-start gap-4">
            <div className="w-3 aspect-square bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>

            <div className="text-left">
              <p className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-full inline-block">7 Nov 2025 - 7 Dec 2025</p>
              <h2 className="text-2xl font-bold mt-2">เปิดรับสมัคร</h2>
              <p className="text-gray-400 text-sm mt-1">[ ผ่าน worldofdata.camp ]</p>
              <p className="mt-2 text-gray-300">วันที่ 7 พฤศจิกายน 2025 - 7 ธันวาคม 2025 เวลา 23:59 น.</p>
            </div>
          </div>


          <div className="flex items-start gap-4">
            <div className="w-3 aspect-square bg-yellow-400/30 rounded-full mt-2 flex-shrink-0"></div>

            <div className="text-left">
              <p className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-full inline-block">08 Dec 2025</p>
              <h2 className="text-2xl font-bold mt-2">ประกาศรายชื่อผู้ผ่านเข้ารอบ 30 คน</h2>
              <p className="text-gray-400 text-sm mt-1">[ Instagram Account, Facebook Fanpage และ Email ตอบกลับ]</p>
              <p className="mt-2 text-gray-300">ประกาศผล : วันที่ 8 ธันวาคม 2025 เวลา 10:00 น. ผู้ผ่านเข้ารอบจำนวน 30 คน ผ่านช่องทาง Instagram Account, Facebook Fanpage และ Email ตอบกลับ</p>
            </div>
          </div>


          <div className="flex items-start gap-4">
            <div className="w-3 aspect-square bg-yellow-400/30 rounded-full mt-2 flex-shrink-0"></div>

            <div className="text-left">
              <p className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-full inline-block">09 Jan 2026 - 11 Jan 2026</p>
              <h2 className="text-2xl font-bold mt-2">กิจกรรมค่าย</h2>
              <p className="text-gray-400 text-sm mt-1">[ Thammaseat University ]</p>
              <p className="mt-2 text-gray-300">วันที่ 9 - 11 มกราคม 2026 (3 วัน 2 คืน) 📍ค้างคืนที่มหาวิทยาลัยธรรมศาสตร์ รังสิต</p>
            </div>
          </div>
        </div>
      </section>

      <Gallery />


      <section id="News" className="flex flex-col items-center justify-center text-center py-20 z-100" style={{ zIndex: 9999, position: 'relative' }}>
        <h1 className="text-2xl flex items-center gap-2 transition">
          <Image className="w-10" src="/news.svg" alt="Book Icon" width={100} height={100} />News
        </h1>
        <div data-aos="flip-down" className="bg-[#0E1015] text-white p-8 m-4 rounded-3xl flex justify-center items-center">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src={images[currentImage]}
              alt="World of Data 2025"
              width={500}
              height={500}
              className="object-cover w-[400px] h-[450px] sm:w-[550px] sm:h-[750px] lg:w-[600px] lg:h-[750px] transition-opacity duration-500 ease-in-out"
            />
          </div>
        </div>
      </section>


      <section id='followus' className="flex flex-col items-center justify-center text-center py-20 z-100" style={{ zIndex: 9999, position: 'relative' }}>
        <h1 className="text-2xl flex items-center gap-2 transition mb-3">
          <Image className="w-10" src="/Following.png" alt="Book Icon" width={100} height={100} />follow us
        </h1>
        <Follow />
        <Link
          href="/Register"
          className="p-6 rounded-xl bg-[#F7C500] hover:bg-[#F7C500]/90 mb-5 mt-20 text-white text-xl font-bold sm:text-xl lg:text-5xl"
        >
          สมัครได้แล้วที่นี่!!!
        </Link>
      </section>


    </div>
  );
}
