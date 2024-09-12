"use client";

import Image from "next/image";

export default function HederComponent() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="flex mt-5 mb-5">
        {/* render a logo */}
        <Image
          src="https://www.nicinsurance.co.tz/img/logo.png"
          alt="logo"
          className="h-16 w-16 mr-10"
          width={64}
          height={64}
        />

        {/* Title Section */}
        <h1 className="text-3xl font-extrabold text-green-600 my-4">
          CEO&apos;S FORUM INSURANCE APPLICATION
        </h1>
      </div>
    </div>
  );
}
