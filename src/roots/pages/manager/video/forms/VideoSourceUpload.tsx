import { ClassValue } from "clsx";
import React, { useState } from "react";
import cn from "../../../../../libs/utils/cn";
import { TextHighLight } from "../../../../../components/ui";
interface IVideoSourceUploadProps {
  className?: ClassValue;
  onChange: (file: File | null) => void;
}
const VideoSourceUpload: React.FC<IVideoSourceUploadProps> = ({
  className,
  onChange,
}) => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className={cn("space-y-2", className)}>
      <h1>Video's source</h1>
      <div className={cn("rounded-md border border-gray-100  p-4 shadow-md")}>
        <label
          htmlFor="upload"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 fill-white stroke-indigo-500"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-gray-600 font-medium">Upload file</span>
        </label>
        <input
          id="upload"
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
              onChange(e.target.files[0]);
            }
          }}
        />
      </div>
      {file && <TextHighLight value={file.name} type={"success"} />}
    </div>
  );
};

export default VideoSourceUpload;
