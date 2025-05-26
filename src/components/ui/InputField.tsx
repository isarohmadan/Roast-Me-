"use client";

import React, { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  className = "",
  containerClassName = "",
}) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label className="block text-gray-700 border text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        className={`bg-[#d9d9d9] shadow appearance-none border w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        } ${className}`}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
