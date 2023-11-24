"use client";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { calculateTokenCost } from "@/lib/utils";
import FrontSelector from "./FrontSelector";
import CodeForm from "./CodeForm";
import { useImageStore } from "@/store/image";

type Props = {
  html: string;
  setHtml: Dispatch<SetStateAction<string>>;
};

export default function ImageUploader({ html, setHtml }: Props) {
  /**
   * state
   */
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [imageType, setImageType] = useState<"low" | "high">("low");

  // zustand
  const { setImageFile, clearImageFile } = useImageStore();

  /**
   * handler
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      // console.log(file);
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handlerFileClear = () => {
    setPreviewUrl(null);
    // clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      clearImageFile();
    }
  };

  const onImageLoad = () => {
    if (imageRef.current) {
      console.log(
        "Width:",
        imageRef.current.naturalWidth,
        "Height:",
        imageRef.current.naturalHeight
      );
      setSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-lg items-center gap-1.5 ">
      {/* <Label htmlFor="picture">Picture</Label> */}
      <Input
        onChange={handleFileChange}
        id="picture"
        type="file"
        ref={fileInputRef}
        placeholder="Upload a picture"
        accept=".png, .jpeg, .jpg, .webp, .gif"
      />
      {previewUrl && (
        <div className="flex flex-col gap-5">
          <img
            ref={imageRef}
            className="w-full h-full rounded"
            src={previewUrl}
            alt="Preview"
            onLoad={onImageLoad}
          />
          <div className="flex self-center gap-3 font-medium  ">
            <p>Width {size.width}px</p>
            <p>Height {size.height}px</p>
          </div>

          <p className="text-center">
            Token cost:{" "}
            <span className="font-semibold">
              {calculateTokenCost(size.width, size.height, imageType)}
            </span>
          </p>
        </div>
      )}
      {previewUrl && (
        <div className="mt-3 flex items-center gap-3">
          <Button variant="outline" onClick={handlerFileClear}>
            Clear
          </Button>{" "}
        </div>
      )}

      {previewUrl && (
        <div className="border-t py-3  ">
          <CodeForm
            loading={loading}
            setLoading={setLoading}
            setImageType={setImageType}
            setHtml={setHtml}
          />
        </div>
      )}
    </div>
  );
}
