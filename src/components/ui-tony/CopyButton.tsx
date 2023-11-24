"use client";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
type Props = {
  html: string;
  className?: string;
};

/**
 * copy
 * @param text
 */
function copyToClipBoard(text: string) {
  toast.promise(navigator.clipboard.writeText(text), {
    loading: "Copying",
    success: "Copied!",
    error: "Copy error",
  });
}

export default function CopyButton({ html, className }: Props) {
  const [copyText, setCopyText] = useState("Copy");
  // &check;
  return (
    <Button
      className={cn("absolute top-2 right-2", className)}
      onClick={() => {
        copyToClipBoard(html);
        setCopyText("Copied ✅");
        setTimeout(() => {
          setCopyText("Copy");
        }, 2000);
      }}
    >
      {copyText}
    </Button>
  );
}
