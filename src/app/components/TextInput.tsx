"use client";
import React from "react";
import Image from "next/image";

interface TextInputProps {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  text: string;
  imageSrc?: string; // รูป (optional)
  showImage?: boolean; // เปิด/ปิดรูป
  imageAlt?: string; // คำอธิบายรูป
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
  return (
    <div className="w-full bg-white/10 p-5 rounded-2xl backdrop-blur-2xl border border-gray-400 mb-5">
      <div className="flex flex-col  gap-3 w-full">
        <p className="text-gray-200 ">{text}</p>
        {showImage && imageSrc && (
        <div className="w-full h-24 lg:h-50 md:h-50 relative overflow-hidden rounded-xl lg:rounded-2xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
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
