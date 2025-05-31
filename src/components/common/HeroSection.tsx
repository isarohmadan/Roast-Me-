"use client";

import React, { useState } from "react";
import Image from "next/image";

import America from "@assets/images/america-flag.jpg";
import Indonesia from "@assets/images/indonesia-flag.jpg";

import Link from "next/link";
import InputField from "@/components/ui/InputField";

const HeroSection: React.FC = () => {
  const [inputValues, setInputValues] = useState<string[]>(["", ""]);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center py-8 w-full px-6">
      <div className="wrapper">
        <h1 className="text-[64px] leading-normal md:text-[128px]  font-normal text-[#d70654] text-shadow-xl text-shadow ">
          Roast Me!
        </h1>
      </div>

      <div className="flex gap-6">
        <Link href="./rate?language=english" className="box-shadow">
          <Image src={America} width={80} height={80} alt="English"></Image>
        </Link>
        <Link href="./rate?language=bahasa" className="box-shadow">
          <Image src={Indonesia} width={80} height={80} alt="English"></Image>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
