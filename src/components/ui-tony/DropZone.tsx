"use client";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {};

interface FileWithPreview extends File {
  preview: string;
}

export default function DropZone({}: Props) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const urls = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(urls);
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          alt="preview"
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="bg-white w-full h-64 p-2"
      >
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
        <aside>{thumbs}</aside>
      </div>
    </section>
  );
}
