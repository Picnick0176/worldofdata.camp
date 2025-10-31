"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Gallery() {
  const images = [
    "/DSC_0007.JPG",
    "/DSC_0048.JPG",
    "/DSC_0072.JPG",
    "/DSC_0103.JPG",
    "/DSC_0124.JPG",
    "/DSC_0199.JPG",
    "/DSC_0226.JPG",
    "/DSC_0308.JPG",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // เริ่ม fade out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true); // fade in
      }, 600); // ระยะเวลา fade (ms) ต้องตรงกับ transition
    }, 5000); // เปลี่ยนรูปทุก 3 วินาที
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="Gallery" className="flex flex-col items-center justify-center text-center m-8" style={{ zIndex: 9999, position: 'relative'}}>
      <div className="bg-[#0E1015] w-full h-80 sm:h-150 max-w-4xl rounded-3xl flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl flex items-center gap-2 mb-4">
          <Image className="w-10" src="/Frame.svg" alt="Qualification Icon" width={40} height={40} />
          Gallery
        </h1>
        <div className="w-full h-full relative">
          <Image
            src={images[currentIndex]}
            alt="Gallery Image"
            fill
            className={`object-cover rounded-2xl transition-opacity duration-600 ${fade ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>
    </section>
  );
}
