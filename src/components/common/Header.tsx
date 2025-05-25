"use client";

import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="w-full absolute top-0 left-0 z-10 p-6">
      <div className="mx-auto flex justify-end">
        <div className="relative h-[64px] w-[64px] rounded-full overflow-hidden">
          <Image
            src="https://avatars.githubusercontent.com/u/123456789?v=4"
            alt="Profile"
            width={134}
            height={134}
            className="object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
