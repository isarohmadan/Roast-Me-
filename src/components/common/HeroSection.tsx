"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";

const HeroSection: React.FC = () => {
  const [inputValues, setInputValues] = useState<string[]>(["", ""]);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Starting game with inputs:", inputValues);
    alert("Game starting!");
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center py-8 w-full px-6">
      <div className="wrapper">
        <h1 className="text-[64px] leading-normal md:text-[128px]  font-normal text-[#d70654] text-shadow-xl text-shadow ">
          Roast Me!
        </h1>
      </div>

      <div className="flex gap-6">
        <InputField
          value={inputValues[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          className="w-[92px] h-[92px] box-shadow bg-[#d9d9d9]"
        />
        <InputField
          value={inputValues[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
          className="w-[92px] h-[92px] box-shadow bg-[#d9d9d9]"
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="bg-[#d70654] text-white py-1 px-24  md:py-3 md:px-24 font-bold text-[32px] mt-8 hover:text-black box-shadow transition-colors duration-300"
      >
        GOW!
      </Button>
    </div>
  );
};

export default HeroSection;
