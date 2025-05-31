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
  ...props
}) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label className="block border text-sm font-bold mb-2">{label}</label>
      )}
      <input
        type="checkbox"
        className={`bg-[#d9d9d9] shadow appearance-none border leading-tight w-[20px] focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
        placeholder={label}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
