"use client";
import React from "react";

type TextInputProps = {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function TextInput({ label, value, onChange, placeholder }: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
