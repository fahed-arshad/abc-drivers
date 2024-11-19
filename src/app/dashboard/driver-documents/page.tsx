"use client";

import { useState } from "react";

import Headline from "../components/headline";
import { Separator } from "@/components/ui/separator";
import FileUploadBlock from "../components/file-upload-block";
import FileUploadedBlock from "../components/file-uploaded-block";

import { FilesIcon } from "lucide-react";

function DriverDocumentsPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    //
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Headline title="INSURANCE INFORMATION" icon={FilesIcon} />
        <Separator />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-24">
        <FileUploadedBlock
          title="Driver and vehicle Insurance"
          description="For verification upload your vehicle insurance"
          url="http://localhost:3000/uploads/insurance.pdf"
        />
        <FileUploadBlock
          title="Driver and vehicle Insurance"
          description="For verification upload your vehicle insurance"
          onUploadFinished={(data) => {}}
        />
        <FileUploadBlock
          title="Vehicle Ownership (Mulkiya)"
          description="For verification upload your vehicle ownership (mulkiya)"
          onUploadFinished={(data) => {}}
        />
        <FileUploadBlock
          title="Driver License"
          description="For verification upload your driving license"
          onUploadFinished={(data) => {}}
        />
        <FileUploadBlock
          title="Identification card"
          description="For verification upload your Resident identification card"
          onUploadFinished={(data) => {}}
        />
      </div>
    </div>
  );
}

export default DriverDocumentsPage;
