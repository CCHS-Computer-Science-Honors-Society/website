/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import React from "react";
import SVG from "public/underconstruction.svg";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="py-8 text-5xl font-bold">
        Sorry This Page is Still Under Construction
      </h1>
      <Image src={SVG} alt="image" />
    </div>
  );
}
