import { useRef, useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type FileUploadBlockProps = {
  title: string;
  description: string;
  onUploadFinished: (data: any) => void;
};

function FileUploadBlock({
  title,
  description,
  onUploadFinished,
}: FileUploadBlockProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      onUploadFinished(data);
      toast.success("File uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs">{description}</p>
      <div className="border-2 border-input border-dashed px-4 py-5 flex flex-col items-center justify-center space-y-2">
        <p className="text-sm font-semibold">Select File Here</p>
        <p className="text-xs">Files supported: pdf, image</p>
        <Button
          loading={uploading}
          onClick={(e) => {
            e.preventDefault();
            fileRef.current?.click();
          }}
        >
          Choose File
        </Button>
        <input
          type="file"
          ref={fileRef}
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}

export default FileUploadBlock;
