"use client";

import Image from "next/image";
import { useState } from "react";

export default function CopyButton({ note }: { note: string }) {
  const [copyText, setCopyText] = useState("Copy");

  const handleClick = () => {
    setCopyText("Copied");
    navigator.clipboard.writeText(note);
    console.log("Copied text");

    setTimeout(() => {
      setCopyText("Copy");
    }, 1500);
  };

  return (
    <>
      <button className="btn" onClick={handleClick}>
        <Image src="/copy.svg" alt="Copy" width={20} height={20} />
        {copyText}
      </button>
    </>
  );
}
