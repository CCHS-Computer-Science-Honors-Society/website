import React from "react";

export default function SkButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="text-neutarl-700 h-[50px] rounded-md border border-black bg-white px-4 py-2 text-sm transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
      {children}
    </button>
  );
}
