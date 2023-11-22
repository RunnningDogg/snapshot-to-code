"use client";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
type Props = {};

export default function ImageUploader({}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handlerFileClear = () => {
    setPreviewUrl(null);
    // clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input
        onChange={handleFileChange}
        id="picture"
        type="file"
        ref={fileInputRef}
        placeholder="Upload a picture"
      />
      {previewUrl && (
        <img className="w-full h-full" src={previewUrl} alt="Preview" />
      )}
      {previewUrl && (
        <div className="flex items-center gap-3">
          <Button className="items-start">Upload</Button>{" "}
          <Button variant="outline" onClick={handlerFileClear}>
            Clear
          </Button>{" "}
        </div>
      )}
    </div>
  );
}
