"use client";
import React, { useState } from "react";
import Image from "next/image";

interface TextInputProps {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  text: string;
  imageSrc?: string;
  showImage?: boolean;
  imageAlt?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  value,
  placeholder = "",
  onChange,
  required = false,
  className = "",
  text = "",
  imageSrc,
  showImage = false,
  imageAlt = "icon",
}) => {
  const [isOpen, setIsOpen] = useState(false); // <-- state เปิด/ปิดรูปใหญ่

  return (
    <div className="w-full bg-white/10 p-5 rounded-2xl backdrop-blur-2xl border border-gray-400 mb-5">
      <div className="flex flex-col gap-3 w-full">
        <p className="text-gray-200">{text}</p>

        {showImage && imageSrc && (
          <>
            {/* รูปขนาดปกติ */}
            <div
              className="w-full h-24 lg:h-50 md:h-50 relative overflow-hidden rounded-xl lg:rounded-2xl cursor-pointer"
              onClick={() => setIsOpen(true)} // คลิกแล้วเปิดรูปใหญ่
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Modal แสดงรูปใหญ่ */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
                onClick={() => setIsOpen(false)} // คลิกพื้นหลังเพื่อปิด
              >
                <div className="relative w-[90vw] max-w-3xl h-[80vh]">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-contain rounded-lg"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-lg hover:bg-black/80"
                  >
                    ✕ ปิด
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={`mt-3 p-3 rounded-lg outline-none w-full bg-white/10 backdrop-blur-2xl border border-gray-400 focus:border-yellow-400 transition text-gray-100 ${className}`}
      />
    </div>
  );
};

export default TextInput;
